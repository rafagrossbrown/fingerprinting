---
layout: default
title: Archive
---

<div class="page-title"><h2> News & Blog </h2></div>
				
<div class="divider-line"></div>
<div class="introduction-hero"> <h5> Here you will find the latest news about our tools, events, and tech program, as well as blogposts from experts in the field of data transparency. </h5></div>

<div class="container-fluid">
{% for post in site.posts %}
{% capture thecycle %}{% cycle '1', '2', '3' %}{% endcapture %}

   {% if thecycle == '1' %}<div class='row'><div class="center">{% endif %}

   <a href="{{ site.baseurl }}{{ post.url }}"> 
   <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 module-container">
     <div class="module"
     {% if post.type == 'blog' %}style="background-color:#71ADAE">{% endif %}
     {% if post.type == 'news' %}style="background-color:#9D8BAE">{% endif %}
     {% if post.type == 'update' %}style="background-color:#D19999">{% endif %}
       <div class="text">
         <h2 class="module-heading">{{ post.title}} </h2>
         <p class="module-subheading"> {{post.author}} </p>
         <p class="module-meta"> {{post.date | date_to_string}} </p>
         <p class="category">{{post.type}}</p>
       </div>
     </div>
   </div>
   </a>
   {% if thecycle == '3' or forloop.last %}</div></div>{% endif %}
{% endfor %}
</div>
<div id="twitter-module">
<a class="twitter-timeline" href="https://twitter.com/DTL_info">Tweets by DTL_info</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
<div class="padded-bottom">
				</div>
 
