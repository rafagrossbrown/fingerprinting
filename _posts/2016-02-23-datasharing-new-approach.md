---
layout: default
title: "A New Approach for Data Sharing - Data Transparency Lab works together with AirCloak and The Office for Creative Research"
blurb: ""
date: 2016-02-23 12:17:05 +0100
categories: News
type: blog
author: "Daniel Coloma"
---

<div class="post-container">
<h3>A New Approach for Data Sharing -- Data Transparency Lab works together with AirCloak and The Office for Creative Research to share Datasets in Privacy-preserving Fashion </h3> 

<div class="author">
{{ page.author }}
</div>

<div class="post-date">
{{ page.date | date_to_string }}
</div>



<div class="post-body">

<div class="blurb">
A NEW APPROACH FOR DATA SHARING - DATA TRANSPARENCY LAB WORKS TOGETHER WITH AIRCLOAK AND THE OFFICE FOR CREATIVE RESEARCH EXPLORING NEW WAYS TO SHARE DATASETS WHILE PRESERVING USERS PRIVACY
</div>
 

<p>The primary goal of Data Transparency Lab is to shed light on online personal data practices. In cooperation with researchers and key industry players, DTL supports the development of tools and research that help end-users better understand how their online personal data is used.</p>

<p>Many of those tools must collect data from end-users to shed light on how certain industries are using personal data (e.g. price discrimination, targeted advertisement). DTL aims to make this data available to the broader research community to enable more research and gain a better understanding of online privacy.</p>

<p>Sharing personal data has always been risky and difficult. Traditional strong anonymization techniques like K-anonymity distort data too much, so typically data is shared after simple de-identification (removing personally identifying data like names and account numbers). However, the risk of re-identification remains. </p>

<p>For instance, in 2006 <a href=" http://www.netflixprize.com/"> Netflix launched a public competition</a> to provide a better movie-recommendation algorithm by releasing a dataset of 100 million movie ratings made by 480,000 customers. Although dataset was de-identified (e.g. real names were replaced with random unique identifiers) researchers showed how many users could be re-identified <a href="http://www.cs.utexas.edu/~shmat/shmat_oak08netflix.pdf">by comparing them against non-anonymised movie ratings posted at the Internet Movie Database </a>.</p>

<p>To avoid this danger, personal data is normally shared only with selected trusted partners under controlled conditions. This limits the amount of sharing, and in particular discourages researchers who wish to just play around with the data to see what interesting insights can be gathered.</p>

<p>To overcome these limitations, DTL is exploring new techniques that allow researchers to share datasets quickly, easily, and broadly with negligible risk of re-identification. This exploratory work is being done in cooperation with two companies: <a href="http://ocr.nyc/">The Office for Creative Research (OCR) </a> and <a href="https://aircloak.com/">Aircloak, a spin-off of the Max Planck Institute for Software Systems. </a></p>

<p>The Office for Creative Research developed <a href="https://floodwatch.o-c-r.org/">Floodwatch, a browser application  that records the ads that users see on their browsers</a>, and provides a visual collage of the ads back to the user. OCR is eager to make this data available to researchers so as to better understand the online advertising ecosystem, but only if they are confident that personal data is protected.</p>

<p><a href="https://aircloak.com/">Aircloak </a> has implemented a  cloaked database  that combines new anonymization techniques with trusted Computing secure hardware and zero-access system hardening. Once data is uploaded to the cloaked database, it can be only accessed via the anonymization interface. Queries run over raw data, but the answers are filtered and noised so that it is extremely difficult to obtain personal data even by a determined attacker. </p>

<p>DTL, OCR, and Aircloak completed an initial study to gain experience with the cloaked database, and determine if useful and accurate answers could be obtained from the database while still protecting personal data. We loaded an initial version of the Floodwatch Dataset into both a cloak and an unprotected database. Among other things, the data included: a non-identifying user ID, an identifier for the ad's image, the page on which the ad was seen, and the time when the ad was viewed. A set of queries were performed against both the cloak and the unprotected database, and compared for accuracy, ease-of-use, and privacy protection. <a href="/docs/DTL-Aircloak-Floodwatch-FullReport.pdf">A report of this study is available online. <i class="fa fa-file-pdf-o"></i></a></p>

<h5>The key conclusions are:</h5>
<ul>
 <li><i class="fa fa-caret-right"></i> Similar insights to the ones achieved by interacting directly with the end-user could be found. For instance, we executed queries to calculate statistics such as number of ads received by each user (total and distinct ads), websites that deliver ads, ads seen by the most distinct users getting similar statistical results that the ones calculated directly using the raw data.</li> 

<li><i class="fa fa-caret-right"></i> The cloaked approach was demonstrated to hide data that could be used to re-identify individual users, and that was readily available through the unprotected database. In particular, images of private individuals seen by only a single user could be found in the unprotected database, but where hidden by the cloaked database.</li> 
<li><i class="fa fa-caret-right"></i>
Usability of the cloaked database is somewhat more difficult than the unprotected database. In particular, analysts must be aware of the kinds of data that can be hidden by the cloak, and must take care not to let this distort the statistical properties of the answers. </li>
</ul>

<p>We would like to give researchers the opportunity to understand and use this new technology. To obtain access to data via a cloak, <a class="typeform-share link" href="https://rafagrossbrown1.typeform.com/to/hdJ3Oo" data-mode="1" target="_blank">please contact our Tech Program <i class="fa fa-envelope fa-1x" style="color:#424242;"></i> </a></p>

<p>This proof of concept is just an initial step towards new mechanisms for sharing Datasets. The Data Transparency Lab is planning to launch a Data Sharing program in order to maximise the number of researchers working in Data Transparency. Stay tuned!</p>

 

<!-- close post body -->
</div>
</div>
