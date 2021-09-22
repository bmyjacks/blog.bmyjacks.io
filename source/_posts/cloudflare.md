---
title: 用CloudFlare来保护个人博客
tags: [CloudFlare, blog, 网络攻击]
categories: CloudFlare
description: 最近许多个人博客都遭到不同程度的攻击，让我们看看如何使用强大的CloudFlare来保护我们的网站吧！
keywords: [CloudFlare, blog, ddos]
date: 2020-03-25 08:12:55
---

## 将域名解析到 CloudFlare

{% note info %}

### 信息

由于各个域名注册商不同，所以在此就不做演示
{% endnote %}

## 配置防火墙

进入 dashboard 后，点击 Firewall，进入到 Firewall Rules
![firewall rules](https://cdn-bmyjacks-io.oss-cn-shenzhen.aliyuncs.com/img/20200325071518.png?x-oss-process=style/img)

### 拦截恶意 bot

新建一个 Firewall Rules，首先我们配置规则让一些会对网站造成威胁的 bot 进行拦截
![example](https://cdn-bmyjacks-io.oss-cn-shenzhen.aliyuncs.com/img/20200325072055.png?x-oss-process=style/img)
在 2 中写入

```bash
(http.user_agent eq "404") or
(http.user_agent eq "nmap") or
(http.user_agent eq "80legs") or
(http.user_agent eq "Abonti") or
(http.user_agent eq "admantx") or
(http.user_agent eq "aipbot") or
(http.user_agent eq "AllSubmitter") or
(http.user_agent eq "Backlink") or
(http.user_agent eq "backlink") or
(http.user_agent eq "Badass") or
(http.user_agent eq "Bigfoot") or
(http.user_agent eq "blexbot") or
(http.user_agent eq "Buddy") or
(http.user_agent eq "CherryPicker") or
(http.user_agent eq "cloudsystemnetwork") or
(http.user_agent eq "cognitiveseo") or
(http.user_agent eq "Collector") or
(http.user_agent eq "cosmos") or
(http.user_agent eq "CrazyWebCrawler") or
(http.user_agent eq "Crescent") or
(http.user_agent eq "Devil") or
(http.user_agent eq "domain") or
(http.user_agent eq "spider") or
(http.user_agent eq "stat") or
(http.user_agent eq "Appender") or
(http.user_agent eq "Crawler") or
(http.user_agent eq "DittoSpyder") or
(http.user_agent eq "Konqueror") or
(http.user_agent eq "Easou") or
(http.user_agent eq "Yisou") or
(http.user_agent eq "Etao") or
(http.user_agent eq "mail") or
(http.user_agent eq "olf") or
(http.user_agent eq "spider") or
(http.user_agent eq "exabot.com") or
(http.user_agent eq "getintent") or
(http.user_agent eq "Grabber") or
(http.user_agent eq "GrabNet") or
(http.user_agent eq "HEADMasterSEO") or
(http.user_agent eq "heritrix") or
(http.user_agent eq "htmlparser") or
(http.user_agent eq "hubspot") or
(http.user_agent eq "Jyxobot") or
(http.user_agent eq "kraken") or
(http.user_agent eq "larbin") or
(http.user_agent eq "ltx71") or
(http.user_agent eq "leiki") or
(http.user_agent eq "LinkScan") or
(http.user_agent eq "Magnet") or
(http.user_agent eq "Mag-Net") or
(http.user_agent eq "Mechanize") or
(http.user_agent eq "MegaIndex") or
(http.user_agent eq "Metasearch") or
(http.user_agent eq "MJ12bot") or
(http.user_agent eq "moz.com") or
(http.user_agent eq "Navroad") or
(http.user_agent eq "Netcraft") or
(http.user_agent eq "niki-bot") or
(http.user_agent eq "NimbleCrawler") or
(http.user_agent eq "Nimbostratus") or
(http.user_agent eq "Ninja") or
(http.user_agent eq "Openfind") or
(http.user_agent eq "Page") or
(http.user_agent eq "Analyzer") or
(http.user_agent eq "Pixray") or
(http.user_agent eq "probethenet") or
(http.user_agent eq "proximic") or
(http.user_agent eq "psbot") or
(http.user_agent eq "RankActive") or
(http.user_agent eq "RankingBot") or
(http.user_agent eq "RankurBot") or
(http.user_agent eq "Reaper") or
(http.user_agent eq "SalesIntelligent") or
(http.user_agent eq "Semrush") or
(http.user_agent eq "SEOkicks") or
(http.user_agent eq "spbot") or
(http.user_agent eq "SEOstats") or
(http.user_agent eq "Snapbot") or
(http.user_agent eq "Stripper") or
(http.user_agent eq "Siteimprove") or
(http.user_agent eq "sitesell") or
(http.user_agent eq "Siphon") or
(http.user_agent eq "Sucker") or
(http.user_agent eq "TenFourFox") or
(http.user_agent eq "TurnitinBot") or
(http.user_agent eq "twingly") or
(http.user_agent eq "VidibleScraper") or
(http.user_agent eq "WebLeacher") or
(http.user_agent eq "WebmasterWorldForum") or
(http.user_agent eq "webmeup") or
(http.user_agent eq "Webster") or
(http.user_agent eq "Widow") or
(http.user_agent eq "Xaldon") or
(http.user_agent eq "Xenu") or
(http.user_agent eq "xtractor") or
(http.user_agent eq "Zermelo") or
(http.user_agent eq "aggregator") or
(http.user_agent eq "AhrefsBot") or
(http.user_agent eq "asterias") or
(http.user_agent eq "BDCbot") or
(http.user_agent eq "BLEXBot") or
(http.user_agent eq "BuiltBotTough") or
(http.user_agent eq "Bullseye") or
(http.user_agent eq "BunnySlippers") or
(http.user_agent eq "ca-crawler") or
(http.user_agent eq "CCBot") or
(http.user_agent eq "Cegbfeieh") or
(http.user_agent eq "CheeseBot") or
(http.user_agent eq "CopyRightCheck") or
(http.user_agent eq "discobot") or
(http.user_agent eq "DOC") or
(http.user_agent eq "DotBot") or
(http.user_agent eq "Download Ninja") or
(http.user_agent eq "EmailCollector") or
(http.user_agent eq "EmailSiphon") or
(http.user_agent eq "EmailWolf") or
(http.user_agent eq "EroCrawler") or
(http.user_agent eq "Exabot") or
(http.user_agent eq "ExtractorPro") or
(http.user_agent eq "Fasterfox") or
(http.user_agent eq "FeedBooster") or
(http.user_agent eq "Foobot") or
(http.user_agent eq "Genieo") or
(http.user_agent eq "grub-client") or
(http.user_agent eq "Harvest") or
(http.user_agent eq "hloader") or
(http.user_agent eq "httplib") or
(http.user_agent eq "humanlinks") or
(http.user_agent eq "ieautodiscovery") or
(http.user_agent eq "InfoNaviRobot") or
(http.user_agent eq "IstellaBot") or
(http.user_agent eq "Java1.") or
(http.user_agent eq "JennyBot") or
(http.user_agent eq "k2spider") or
(http.user_agent eq "Kenjin Spider") or
(http.user_agent eq "Keyword Density0.9") or
(http.user_agent eq "LexiBot") or
(http.user_agent eq "libWeb") or
(http.user_agent eq "libwww") or
(http.user_agent eq "LinkextractorPro") or
(http.user_agent eq "linko") or
(http.user_agent eq "LinkScan8.1a Unix") or
(http.user_agent eq "LinkWalker") or
(http.user_agent eq "LNSpiderguy") or
(http.user_agent eq "lwp-trivial") or
(http.user_agent eq "magpie") or
(http.user_agent eq "Mata Hari") or
(http.user_agent eq "MaxPointCrawler") or
(http.user_agent eq "Microsoft URL Control") or
(http.user_agent eq "MIIxpc") or
(http.user_agent eq "Mippin") or
(http.user_agent eq "Missigua Locator") or
(http.user_agent eq "Mister PiX") or
(http.user_agent eq "moget") or
(http.user_agent eq "MSIECrawler") or
(http.user_agent eq "NetAnts") or
(http.user_agent eq "NICErsPRO") or
(http.user_agent eq "Niki-Bot") or
(http.user_agent eq "NPBot") or
(http.user_agent eq "Nutch") or
(http.user_agent eq "Offline Explorer") or
(http.user_agent eq "panscient.com") or
(http.user_agent eq "ProPowerBot2.14") or
(http.user_agent eq "ProWebWalker") or
(http.user_agent eq "Python-urllib") or
(http.user_agent eq "QueryN Metasearch") or
(http.user_agent eq "RepoMonkey") or
(http.user_agent eq "RMA") or
(http.user_agent eq "SemrushBot") or
(http.user_agent eq "SeznamBot") or
(http.user_agent eq "SISTRIX") or
(http.user_agent eq "sitecheck.Internetseer.com") or
(http.user_agent eq "SiteSnagger") or
(http.user_agent eq "SnapPreviewBot") or
(http.user_agent eq "Sogou") or
(http.user_agent eq "SpankBot") or
(http.user_agent eq "spanner") or
(http.user_agent eq "Spinn3r") or
(http.user_agent eq "suzuran") or
(http.user_agent eq "Szukacz1.4") or
(http.user_agent eq "Teleport") or
(http.user_agent eq "Telesoft") or
(http.user_agent eq "The Intraformant") or
(http.user_agent eq "TheNomad") or
(http.user_agent eq "TightTwatBot") or
(http.user_agent eq "Titan") or
(http.user_agent eq "True_Robot") or
(http.user_agent eq "turingos") or
(http.user_agent eq "UbiCrawler") or
(http.user_agent eq "UnisterBot") or
(http.user_agent eq "URLy Warning") or
(http.user_agent eq "VCI") or
(http.user_agent eq "WBSearchBot") or
(http.user_agent eq "Web Downloader6.9") or
(http.user_agent eq "WebAuto") or
(http.user_agent eq "WebBandit") or
(http.user_agent eq "WebCopier") or
(http.user_agent eq "WebEnhancer") or
(http.user_agent eq "WebmasterWorldForumBot") or
(http.user_agent eq "WebReaper") or
(http.user_agent eq "WebSauger") or
(http.user_agent eq "Website Quester") or
(http.user_agent eq "Webster Pro") or
(http.user_agent eq "WebStripper") or
(http.user_agent eq "WebZip") or
(http.user_agent eq "Wotbox") or
(http.user_agent eq "wsr-agent") or
(http.user_agent eq "WWW-Collector-E") or
(http.user_agent eq "Zao") or
(http.user_agent eq "Zeus") or
(http.user_agent eq "ZyBORG") or
(http.user_agent eq "coccoc") or
(http.user_agent eq "Incutio") or
(http.user_agent eq "lmspider") or
(http.user_agent eq "memoryBot") or
(http.user_agent eq "serf") or
(http.user_agent eq "Unknown") or
(http.user_agent eq "uptime files") or
(http.user_agent eq "HTTrack") or
(http.user_agent eq "Apache-HttpClient") or
(http.user_agent eq "harvest") or
(http.user_agent eq "audit") or
(http.user_agent eq "dirbuster") or
(http.user_agent eq "pangolin") or
(http.user_agent eq "sqln") or
(http.user_agent eq "hydra") or
(http.user_agent eq "Parser") or
(http.user_agent eq "BBBike") or
(http.user_agent eq "sqlmap") or
(http.user_agent eq "w3af") or
(http.user_agent eq "owasp") or
(http.user_agent eq "Nikto") or
(http.user_agent eq "fimap") or
(http.user_agent eq "havij") or
(http.user_agent eq "zmeu") or
(http.user_agent eq "FeedDemon") or
(http.user_agent eq "Indy Library") or
(http.user_agent eq "Alexa Toolbar") or
(http.user_agent eq "AskTbFXTV") or
(http.user_agent eq "CrawlDaddy") or
(http.user_agent eq "CoolpadWebkit") or
(http.user_agent eq "Java") or
(http.user_agent eq "Feedly") or
(http.user_agent eq "UniversalFeedParser") or
(http.user_agent eq "ApacheBench") or
(http.user_agent eq "Swiftbot") or
(http.user_agent eq "ZmEu") or
(http.user_agent eq "oBot") or
(http.user_agent eq "jaunty") or
(http.user_agent eq "lightDeckReports Bot") or
(http.user_agent eq "YYSpider") or
(http.user_agent eq "DigExt") or
(http.user_agent eq "HttpClient") or
(http.user_agent eq "EasouSpider") or
(http.user_agent eq "Ezooms") or
(http.user_agent eq "BabyKrokodil") or
(http.user_agent eq "netsparker") or
(http.user_agent eq "httperf")
```

接着可以在 1 中设置防火墙规则的名称，在 3 中选择出触发防火墙规则后的动作

```bash
Block #阻止访问
JS Challenge #使用JS验证，bot无法通过验证，浏览器可以通过验证(推荐用于bot)
Challenge(Captcha) #使用验证码验证，浏览器必须输入验证码才可访问(中国也可查看验证码页面)
Allow #允许访问
Bypass #跳过(这个目前博主也不太明白具体是什么意思，希望各路大神多多指教)
```

点击保存，确保设置为打开状态，现在，恶意 bot 就无法访问您的网站了！
![Turn on the firewall](https://cdn-bmyjacks-io.oss-cn-shenzhen.aliyuncs.com/img/20200325072746.png?x-oss-process=style/img)

## 恶意 IP

新建 Firewall Rule，按照图示编辑选项
![Whreat score](https://cdn-bmyjacks-io.oss-cn-shenzhen.aliyuncs.com/img/20200325080814.png?x-oss-process=style/img)

```bash
Threat Score #IP威胁指数
# TS>50 威胁性很高
# 24<TS<50 威胁性中
# TS>10 威胁性低
```

点击`And`，选择`Known bots`,关闭开关。
并且不是已知的优良 bot，保存，成功！

{% note success %}

## 恭喜

恭喜您，目前网上的一些普通攻击已经无法对您的网站造成伤害了
{% endnote %}
