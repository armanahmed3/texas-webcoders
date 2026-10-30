# Publishes the blog files made by build.ps1 straight to the live site (branch main), as one commit.
# Needs a GitHub fine-grained token for this repo only (Contents: read and write) in the TWC_GITHUB_TOKEN user environment variable.
param([string]$Message = 'Daily blog post')
$ErrorActionPreference = 'Stop'
$token = if ($env:TWC_GITHUB_TOKEN) { $env:TWC_GITHUB_TOKEN } else { [Environment]::GetEnvironmentVariable('TWC_GITHUB_TOKEN', 'User') }
if (-not $token) { throw 'TWC_GITHUB_TOKEN is not set, so the post was built locally but not published.' }
$site = Split-Path $PSScriptRoot -Parent
$repo = 'https://api.github.com/repos/armanahmed3/texas-webcoders'
$headers = @{ Authorization = "Bearer $token"; Accept = 'application/vnd.github+json'; 'User-Agent' = 'twc-blog' }
function Call($method, $path, $body) {
  $request = @{ Uri = "$repo$path"; Method = $method; Headers = $headers }
  if ($body) { $request.Body = ($body | ConvertTo-Json -Depth 6 -Compress); $request.ContentType = 'application/json' }
  Invoke-RestMethod @request
}
$files = @(Get-ChildItem "$site\blog" -Recurse -File | Where-Object { $_.Extension -in '.html', '.json' -and $_.Name -ne '_template.html' })
$files += foreach ($name in 'index.html', 'blog.html', 'sitemap.xml', 'feed.xml') { Get-Item "$site\$name" }
$entries = foreach ($file in $files) {
  $relative = $file.FullName.Substring($site.Length + 1).Replace('\', '/')
  $blob = Call Post '/git/blobs' @{ content = [Convert]::ToBase64String([IO.File]::ReadAllBytes($file.FullName)); encoding = 'base64' }
  @{ path = "public/$relative"; mode = '100644'; type = 'blob'; sha = $blob.sha }
}
$main = Call Get '/commits/main'
$tree = Call Post '/git/trees' @{ base_tree = $main.commit.tree.sha; tree = @($entries) }
if ($tree.sha -eq $main.commit.tree.sha) { 'Nothing new to publish.'; return }
$commit = Call Post '/git/commits' @{ message = $Message; tree = $tree.sha; parents = @($main.sha) }
$null = Call Patch '/git/refs/heads/main' @{ sha = $commit.sha; force = $false }
"Published $($commit.sha)"
