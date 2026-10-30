# Texas WebCoders blog builder.
# Reads blog/posts/*.json and writes:
#   blog/<slug>.html (article pages), blog.html (listing), blog/posts.json (index),
#   the "latest posts" block in index.html, sitemap.xml and feed.xml.
# Run:  powershell -ExecutionPolicy Bypass -File blog\build.ps1
# Post fields: slug, title, description, category, date (yyyy-MM-dd), readMins, image (portfolio path, optional), body (HTML), draft (optional true).
# Posts dated in the future or marked draft are skipped until their date arrives.

$ErrorActionPreference = 'Stop'
$blog = $PSScriptRoot
$root = Split-Path $blog -Parent
$site = 'https://texaswebcoders.com'
$media = 'https://texaswebcoders.com/portfolio-media/texaswebcoders/'
$enc = New-Object System.Text.UTF8Encoding($false)
$us = [Globalization.CultureInfo]::InvariantCulture
$today = (Get-Date).Date
$H = { param($s) [System.Net.WebUtility]::HtmlEncode([string]$s) }

$template = [IO.File]::ReadAllText("$blog\_template.html", $enc)
$posts = Get-ChildItem "$blog\posts" -Filter *.json | ForEach-Object {
  $p = [IO.File]::ReadAllText($_.FullName, $enc) | ConvertFrom-Json
  foreach ($f in 'slug','title','description','category','date','body') { if (-not $p.$f) { throw "$($_.Name) is missing '$f'" } }
  if ($p.slug -notmatch '^[a-z0-9-]+$') { throw "$($_.Name): slug must be lowercase letters, numbers and dashes" }
  $p | Add-Member -NotePropertyName when -NotePropertyValue ([datetime]::ParseExact($p.date, 'yyyy-MM-dd', $us)) -Force
  $p
} | Where-Object { -not $_.draft -and $_.when -le $today } | Sort-Object when, slug -Descending
if (-not $posts) { throw 'No published posts found.' }
$posts = @($posts)

function Page($title, $desc, $canonical, $page, $base, $ogtype, $body, $extra) {
  $template.Replace('{{TITLE}}', (& $H $title)).Replace('{{DESC}}', (& $H $desc)).Replace('{{CANONICAL}}', $canonical).Replace('{{PAGE}}', $page).Replace('{{BASE}}', $base).Replace('{{OGTYPE}}', $ogtype).Replace('{{EXTRA}}', $extra).Replace('{{BODY}}', $body)
}
function Card($p) {
  $img = if ($p.image) { "<span class=`"thumb`"><img loading=`"lazy`" src=`"$media$($p.image)`" alt=`"`"></span>" } else { '' }
  "<a class=`"post`" href=`"blog/$($p.slug).html`" data-cat=`"$(& $H $p.category)`">$img<span class=`"k`"><b>$(& $H $p.category)</b><span>$($p.readMins) min</span></span><h3>$(& $H $p.title)</h3><p>$(& $H $p.description)</p><span class=`"rd`">Read article <svg class=`"icon`"><use href=`"#i-arrow`"/></svg></span></a>"
}
function Nice($d) { $d.ToString('MMM d, yyyy', $us) }

# ---------- article pages ----------
foreach ($p in $posts) {
  $related = @($posts | Where-Object { $_.slug -ne $p.slug -and $_.category -eq $p.category }) + @($posts | Where-Object { $_.slug -ne $p.slug -and $_.category -ne $p.category })
  $related = $related | Select-Object -First 3
  $url = "$site/blog/$($p.slug).html"
  $share = [uri]::EscapeDataString($url)
  $ld = @{ '@context' = 'https://schema.org'; '@type' = 'BlogPosting'; headline = $p.title; description = $p.description; datePublished = $p.date; author = @{ '@type' = 'Organization'; name = 'Texas WebCoders' }; publisher = @{ '@type' = 'Organization'; name = 'Texas WebCoders' }; mainEntityOfPage = $url } | ConvertTo-Json -Depth 4 -Compress
  $body = @"
<div class="read-bar" aria-hidden="true"><i></i></div>
<section class="phero post-hero" data-shape="layers" data-x="3.4" data-y="0.4" data-s="0.6" data-op="0.6">
  <div class="wrap">
    <div class="crumbs"><a href="index.html">Home</a><i></i><a href="blog.html">Blog</a><i></i><span>$(& $H $p.category)</span></div>
    <h1>$(& $H $p.title)</h1>
    <p class="lead">$(& $H $p.description)</p>
    <div class="post-meta"><span>$(Nice $p.when)</span><span>$($p.readMins) min read</span><span>By the Texas WebCoders team</span></div>
  </div>
</section>
<section class="block solid post-wrap">
  <div class="wrap post-grid">
    <article class="prose">$($p.body)</article>
    <aside class="post-aside">
      <div class="aside-card">
        <span class="tag">Free consultation</span>
        <h3>Want this working for your business?</h3>
        <p>Talk to our team, or tap <b>Talk to our AI</b> at the bottom right to try our AI agent live.</p>
        <a class="btn btn-dark" href="contact.html">Book a free call <span class="dot"><svg class="icon"><use href="#i-ne"/></svg></span></a>
      </div>
      <div class="share"><span>Share</span><a href="https://www.linkedin.com/sharing/share-offsite/?url=$share" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.facebook.com/sharer/sharer.php?u=$share" target="_blank" rel="noopener">Facebook</a><a href="https://twitter.com/intent/tweet?url=$share" target="_blank" rel="noopener">X</a></div>
    </aside>
  </div>
</section>
<section class="block paper" aria-labelledby="more-h">
  <div class="wrap">
    <div class="head"><div><span class="tag">Keep reading</span><h2 id="more-h">More from the <em class="it acc">blog.</em></h2></div><a class="btn btn-line" href="blog.html">All articles <span class="dot"><svg class="icon"><use href="#i-ne"/></svg></span></a></div>
    <div class="posts">$(($related | ForEach-Object { Card $_ }) -join '')</div>
  </div>
</section>
<script type="application/ld+json">$ld</script>
"@
  $html = Page "$($p.title) | Texas WebCoders Blog" $p.description $url 'post' '<base href="../">' 'article' $body ''
  [IO.File]::WriteAllText("$blog\$($p.slug).html", $html, $enc)
}

# ---------- listing page ----------
$cats = $posts | ForEach-Object { $_.category } | Sort-Object -Unique
$feat = $posts[0]
$featImg = if ($feat.image) { "<span class=`"thumb`"><img src=`"$media$($feat.image)`" alt=`"`"></span>" } else { '' }
$listBody = @"
<section class="phero" data-shape="bubble" data-x="3.2" data-y="0.4" data-s="0.65" data-op="0.8" style="min-height:62vh">
  <div class="wrap phero-grid">
    <div>
      <div class="crumbs"><a href="index.html">Home</a><i></i><span>Blog</span></div>
      <h1>Notes from our <em>AI lab.</em></h1>
      <p class="lead">Practical guides on AI receptionists, chatbots, automation, websites and growth, written for business owners.</p>
    </div>
    <div class="phero-side">
      <div class="stat"><b>$($posts.Count)</b><span>articles published</span></div>
      <div class="stat"><b>$($cats.Count)</b><span>topics covered</span></div>
      <div class="stat"><b>$(Nice $feat.when)</b><span>latest article</span></div>
    </div>
  </div>
</section>
<section class="block solid" aria-labelledby="bl-h" style="padding-top:20px">
  <div class="wrap">
    <h2 id="bl-h" class="sr">Articles</h2>
    <a class="feat-post" href="blog/$($feat.slug).html">$featImg<span class="fp-txt"><span class="k"><b>Latest · $(& $H $feat.category)</b><span>$(Nice $feat.when) · $($feat.readMins) min read</span></span><h3>$(& $H $feat.title)</h3><p>$(& $H $feat.description)</p><span class="rd">Read article <svg class="icon"><use href="#i-arrow"/></svg></span></span></a>
    <div class="pf-filters" id="bfilters" role="group" aria-label="Filter articles"><button aria-pressed="true" data-f="all">All<span>$($posts.Count)</span></button>$(($cats | ForEach-Object { $c = $_; "<button aria-pressed=`"false`" data-f=`"$(& $H $c)`">$(& $H $c)<span>$(@($posts | ? { $_.category -eq $c }).Count)</span></button>" }) -join '')</div>
    <div class="posts blog-list">$(($posts | ForEach-Object { Card $_ }) -join '')</div>
  </div>
</section>
"@
[IO.File]::WriteAllText("$root\blog.html", (Page 'Blog: AI, Websites & Growth Guides | Texas WebCoders' 'Practical guides on AI receptionists, AI chatbots, automation, websites and marketing for small businesses, from Texas WebCoders.' "$site/blog.html" 'blog' '' 'website' $listBody ''), $enc)

# ---------- posts.json index ----------
$index = $posts | ForEach-Object { [ordered]@{ slug = $_.slug; title = $_.title; description = $_.description; category = $_.category; date = $_.date; readMins = $_.readMins; url = "blog/$($_.slug).html" } }
[IO.File]::WriteAllText("$blog\posts.json", (ConvertTo-Json @($index) -Depth 3), $enc)

# ---------- home page: latest 3 posts ----------
$homeHtml = [IO.File]::ReadAllText("$root\index.html", $enc)
$latest = ($posts | Select-Object -First 3 | ForEach-Object { $c = Card $_; $c -replace '<span class="thumb">.*?</span>', '' }) -join "`n      "
$pattern = '(?s)(<!--LATEST-POSTS-->).*?(<!--/LATEST-POSTS-->)'
if ($homeHtml -match $pattern) {
  $homeHtml = [regex]::Replace($homeHtml, $pattern, { param($m) $m.Groups[1].Value + "`n      " + $latest + "`n      " + $m.Groups[2].Value })
  [IO.File]::WriteAllText("$root\index.html", $homeHtml, $enc)
}

# ---------- sitemap + RSS ----------
$pages = 'index.html','ai-receptionist.html','services.html','portfolio.html','pricing.html','blog.html','about.html','contact.html'
$urls = ($pages | ForEach-Object { "  <url><loc>$site/$_</loc><lastmod>$($today.ToString('yyyy-MM-dd'))</lastmod></url>" }) + ($posts | ForEach-Object { "  <url><loc>$site/blog/$($_.slug).html</loc><lastmod>$($_.date)</lastmod></url>" })
[IO.File]::WriteAllText("$root\sitemap.xml", "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`">`n$($urls -join "`n")`n</urlset>`n", $enc)
$items = $posts | Select-Object -First 20 | ForEach-Object { "  <item><title>$(& $H $_.title)</title><link>$site/blog/$($_.slug).html</link><guid>$site/blog/$($_.slug).html</guid><pubDate>$($_.when.ToString('ddd, dd MMM yyyy 09:00:00 -0600', $us))</pubDate><category>$(& $H $_.category)</category><description>$(& $H $_.description)</description></item>" }
[IO.File]::WriteAllText("$root\feed.xml", "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n<rss version=`"2.0`"><channel>`n  <title>Texas WebCoders Blog</title><link>$site/blog.html</link><description>AI, websites and growth guides for small businesses.</description>`n$($items -join "`n")`n</channel></rss>`n", $enc)

"Built $($posts.Count) posts, blog.html, posts.json, sitemap.xml, feed.xml"
