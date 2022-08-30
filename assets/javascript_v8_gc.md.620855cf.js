import{_ as e,c as a,o as n,a as c}from"./app.218f227b.js";const m=JSON.parse('{"title":"\u8C08\u4E00\u8C08 v8 \u7684\u5783\u573E\u56DE\u6536\u673A\u5236\uFF1F","description":"","frontmatter":{"title":"\u8C08\u4E00\u8C08 v8 \u7684\u5783\u573E\u56DE\u6536\u673A\u5236\uFF1F","date":"2020-06-16T20:31:29.000Z","sidebar":"auto","tags":["Javascript","v8 \u5F15\u64CE","\u5783\u573E\u56DE\u6536"],"categories":["Javascript"]},"headers":[{"level":2,"title":"\u8C03\u7528\u6808\u4E2D\u7684\u6570\u636E\u56DE\u6536","slug":"\u8C03\u7528\u6808\u4E2D\u7684\u6570\u636E\u56DE\u6536","link":"#\u8C03\u7528\u6808\u4E2D\u7684\u6570\u636E\u56DE\u6536","children":[]},{"level":2,"title":"\u5806\u4E2D\u7684\u6570\u636E\u56DE\u6536","slug":"\u5806\u4E2D\u7684\u6570\u636E\u56DE\u6536","link":"#\u5806\u4E2D\u7684\u6570\u636E\u56DE\u6536","children":[{"level":3,"title":"\u65B0\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536 Scavenge","slug":"\u65B0\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536-scavenge","link":"#\u65B0\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536-scavenge","children":[]},{"level":3,"title":"\u8001\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536","slug":"\u8001\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536","link":"#\u8001\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536","children":[]},{"level":3,"title":"\u589E\u91CF\u6807\u8BB0","slug":"\u589E\u91CF\u6807\u8BB0","link":"#\u589E\u91CF\u6807\u8BB0","children":[]}]}],"relativePath":"javascript/v8/gc.md","lastUpdated":1661882834000}'),s={name:"javascript/v8/gc.md"},p=c('<p>\u6211\u4EEC\u90FD\u77E5\u9053\u6570\u636E\u7684\u5B58\u50A8\u65B9\u5F0F\u662F\uFF1A\u57FA\u672C\u7C7B\u578B\u7684\u6570\u636E\u503C\u90FD\u662F\u76F4\u63A5\u4FDD\u5B58\u5728\u201C\u6808\u201D\u4E2D\u7684\uFF0C\u5F15\u7528\u7C7B\u578B\u7684\u503C\u662F\u5B58\u653E\u5728\u201C\u5806\u201D\u4E2D\u7684\u3002</p><h2 id="\u8C03\u7528\u6808\u4E2D\u7684\u6570\u636E\u56DE\u6536" tabindex="-1">\u8C03\u7528\u6808\u4E2D\u7684\u6570\u636E\u56DE\u6536 <a class="header-anchor" href="#\u8C03\u7528\u6808\u4E2D\u7684\u6570\u636E\u56DE\u6536" aria-hidden="true">#</a></h2><p>\u6267\u884C\u5B8C\u51FD\u6570\uFF0C<strong>ESP \u6307\u9488\u4E0B\u79FB</strong>\uFF0C\u4E5F\u5C31\u662F\u4E0A\u4E0B\u6587\u5207\u6362\u4E4B\u540E\uFF0C\u6808\u9876\u7684\u7A7A\u95F4\u4F1A\u81EA\u52A8\u88AB\u56DE\u6536\uFF0C\u91CA\u653E\u5185\u5B58\u3002 \u4F46\u5BF9\u4E8E\u5806\u5185\u5B58\u800C\u8A00\u5C31\u6BD4\u8F83\u590D\u6742\u4E86\uFF0C\u6211\u4EEC\u4E0B\u9762\u7740\u91CD\u5206\u6790\u5806\u5185\u5B58\u7684\u5783\u573E\u56DE\u6536\u3002</p><h2 id="\u5806\u4E2D\u7684\u6570\u636E\u56DE\u6536" tabindex="-1">\u5806\u4E2D\u7684\u6570\u636E\u56DE\u6536 <a class="header-anchor" href="#\u5806\u4E2D\u7684\u6570\u636E\u56DE\u6536" aria-hidden="true">#</a></h2><p>V8 \u4E2D\u4F1A\u628A\u5806\u5206\u4E3A<strong>\u65B0\u751F\u4EE3</strong>\u548C<strong>\u8001\u751F\u4EE3</strong>\u4E24\u4E2A\u533A\u57DF\uFF0C\u65B0\u751F\u4EE3\u5C31\u662F\u4E34\u65F6\u5206\u914D\u7684\u5185\u5B58\uFF0C\u5B58\u6D3B\u65F6\u95F4\u77ED\uFF0C \u8001\u751F\u4EE3\u662F\u5E38\u9A7B\u5185\u5B58\uFF0C\u5B58\u6D3B\u7684\u65F6\u95F4\u957F\u3002V8 \u7684\u5806\u5185\u5B58\uFF0C\u4E5F\u5C31\u662F\u4E24\u4E2A\u5185\u5B58\u4E4B\u548C\u3002</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc1.png" alt=""></p><p>\u6839\u636E\u8FD9\u4E24\u79CD\u4E0D\u540C\u79CD\u7C7B\u7684\u5806\u5185\u5B58\uFF0CV8 \u91C7\u7528\u4E86\u4E0D\u540C\u7684\u56DE\u6536\u7B56\u7565\uFF0C\u6765\u6839\u636E\u4E0D\u540C\u7684\u573A\u666F\u505A\u9488\u5BF9\u6027\u7684\u4F18\u5316\u3002</p><h3 id="\u65B0\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536-scavenge" tabindex="-1">\u65B0\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536 Scavenge <a class="header-anchor" href="#\u65B0\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536-scavenge" aria-hidden="true">#</a></h3><p>\u9996\u5148\u662F\u65B0\u751F\u4EE3\u7684\u5185\u5B58\uFF0C\u5728 64 \u4F4D\u548C 32 \u4F4D\u7CFB\u7EDF\u4E0B\u5206\u522B\u4E3A 32MB \u548C 16MB\u3002\u65B0\u751F\u4EE3\u4E2D\u7684\u53D8\u91CF\u5B58\u6D3B\u65F6\u95F4\u77ED\uFF0C\u6765\u4E86\u9A6C\u4E0A\u5C31\u8D70\uFF0C\u4E0D\u5BB9\u6613\u4EA7\u751F\u592A\u5927\u7684\u5185\u5B58\u8D1F\u62C5\uFF0C\u56E0\u6B64\u53EF\u4EE5\u5C06\u5B83\u8BBE\u7684\u8DB3\u591F\u5C0F\u3002</p><p>\u90A3\u597D\u4E86\uFF0C\u65B0\u751F\u4EE3\u7684\u5783\u573E\u56DE\u6536\u662F\u600E\u4E48\u505A\u7684\u5462\uFF1F</p><p>\u9996\u5148\u5C06\u65B0\u751F\u4EE3\u5185\u5B58\u7A7A\u95F4\u4E00\u5206\u4E3A\u4E8C:</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc2.png" alt=""></p><p>\u5176\u4E2D From \u90E8\u5206\u8868\u793A\u6B63\u5728\u4F7F\u7528\u7684\u5185\u5B58\uFF0CTo \u662F\u76EE\u524D\u95F2\u7F6E\u7684\u5185\u5B58\u3002</p><p>\u5F53\u8FDB\u884C\u5783\u573E\u56DE\u6536\u65F6\uFF0CV8 \u5C06 From \u90E8\u5206\u7684\u5BF9\u8C61\u68C0\u67E5\u4E00\u904D\uFF0C\u5982\u679C\u662F\u5B58\u6D3B\u5BF9\u8C61\u90A3\u4E48\u590D\u5236\u5230 To \u5185\u5B58\u4E2D(\u5728 To \u5185\u5B58\u4E2D\u6309\u7167\u987A\u5E8F\u4ECE\u5934\u653E\u7F6E\u7684)\uFF0C\u5982\u679C\u662F\u975E\u5B58\u6D3B\u5BF9\u8C61\u76F4\u63A5\u56DE\u6536\u5373\u53EF\u3002</p><p>\u5F53\u6240\u6709\u7684 From \u4E2D\u7684\u5B58\u6D3B\u5BF9\u8C61\u6309\u7167\u987A\u5E8F\u8FDB\u5165\u5230 To \u5185\u5B58\u4E4B\u540E\uFF0CFrom \u548C To \u4E24\u8005\u7684\u89D2\u8272\u5BF9\u8C03\uFF0CFrom \u73B0\u5728\u88AB\u95F2\u7F6E\uFF0CTo \u4E3A\u6B63\u5728\u4F7F\u7528\uFF0C\u5982\u6B64\u5FAA\u73AF\u3002</p><p>\u90A3\u4F60\u5F88\u53EF\u80FD\u4F1A\u95EE\u4E86\uFF0C\u76F4\u63A5\u5C06\u975E\u5B58\u6D3B\u5BF9\u8C61\u56DE\u6536\u4E86\u4E0D\u5C31\u4E07\u4E8B\u5927\u5409\u4E86\u561B\uFF0C\u4E3A\u4EC0\u4E48\u8FD8\u8981\u540E\u9762\u7684\u4E00\u7CFB\u5217\u64CD\u4F5C\uFF1F</p><p>From \u5185\u5B58\u662F\u4E0D\u6309\u987A\u5E8F\u653E\u7F6E\u7684\uFF0C\u5728 To \u5185\u5B58\u4E2D\u6309\u7167\u987A\u5E8F\u4ECE\u5934\u653E\u7F6E\u7684\u3002\u4E0D\u76F4\u63A5\u56DE\u6536\u662F\u4E3A\u4E86\u5E94\u5BF9\uFF1A</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc3.png" alt=""></p><p>\u6DF1\u8272\u7684\u5C0F\u65B9\u5757\u4EE3\u8868\u5B58\u6D3B\u5BF9\u8C61\uFF0C\u767D\u8272\u90E8\u5206\u8868\u793A\u5F85\u5206\u914D\u7684\u5185\u5B58\uFF0C\u7531\u4E8E\u5806\u5185\u5B58\u662F\u8FDE\u7EED\u5206\u914D\u7684\uFF0C\u8FD9\u6837\u96F6\u96F6\u6563\u6563\u7684\u7A7A\u95F4\u53EF\u80FD\u4F1A\u5BFC\u81F4\u7A0D\u5FAE\u5927\u4E00\u70B9\u7684\u5BF9\u8C61\u6CA1\u6709\u529E\u6CD5\u8FDB\u884C\u7A7A\u95F4\u5206\u914D\uFF0C\u8FD9\u79CD\u96F6\u6563\u7684\u7A7A\u95F4\u4E5F\u53EB\u505A<code>\u5185\u5B58\u788E\u7247</code>\u3002\u521A\u521A\u4ECB\u7ECD\u7684\u65B0\u751F\u4EE3\u5783\u573E\u56DE\u6536\u7B97\u6CD5\u4E5F\u53EB <code>Scavenge</code> \u7B97\u6CD5\u3002</p><p><code>Scavenge</code> \u7B97\u6CD5\u4E3B\u8981\u5C31\u662F\u89E3\u51B3\u5185\u5B58\u788E\u7247\u7684\u95EE\u9898\uFF0C\u5728\u8FDB\u884C\u4E00\u987F\u590D\u5236\u4E4B\u540E\uFF0CTo \u7A7A\u95F4\u53D8\u6210\u4E86\u8FD9\u4E2A\u6837\u5B50:</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc4.png" alt=""></p><p>\u662F\u4E0D\u662F\u6574\u9F50\u4E86\u8BB8\u591A\uFF1F\u8FD9\u6837\u5C31\u5927\u5927\u65B9\u4FBF\u4E86\u540E\u7EED\u8FDE\u7EED\u7A7A\u95F4\u7684\u5206\u914D</p><p>\u4E0D\u8FC7 Scavenge \u7B97\u6CD5\u7684\u52A3\u52BF\u4E5F\u975E\u5E38\u660E\u663E\uFF0C\u5C31\u662F\u5185\u5B58\u53EA\u80FD\u4F7F\u7528\u65B0\u751F\u4EE3\u5185\u5B58\u7684\u4E00\u534A\uFF0C\u4F46\u662F\u5B83\u53EA\u5B58\u653E\u751F\u547D\u5468\u671F\u77ED\u7684\u5BF9\u8C61\uFF0C\u8FD9\u79CD\u5BF9\u8C61\u4E00\u822C\u5F88\u5C11\uFF0C\u56E0\u6B64\u65F6\u95F4\u6027\u80FD\u975E\u5E38\u4F18\u79C0\u3002</p><h3 id="\u8001\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536" tabindex="-1">\u8001\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536 <a class="header-anchor" href="#\u8001\u751F\u4EE3\u5185\u5B58\u7684\u56DE\u6536" aria-hidden="true">#</a></h3><p>\u521A\u521A\u4ECB\u7ECD\u4E86\u65B0\u751F\u4EE3\u7684\u56DE\u6536\u65B9\u5F0F\uFF0C\u90A3\u4E48\u65B0\u751F\u4EE3\u4E2D\u7684\u53D8\u91CF\u5982\u679C\u7ECF\u8FC7\u591A\u6B21\u56DE\u6536\u540E\u4F9D\u7136\u5B58\u5728\uFF0C\u90A3\u4E48\u5C31\u4F1A\u88AB\u653E\u5165\u5230\u8001\u751F\u4EE3\u5185\u5B58\u4E2D\uFF0C\u8FD9\u79CD\u73B0\u8C61\u5C31\u53EB\u664B\u5347\u3002</p><p>\u53D1\u751F\u664B\u5347\u5176\u5B9E\u4E0D\u53EA\u662F\u8FD9\u4E00\u79CD\u539F\u56E0\uFF0C\u6211\u4EEC\u6765\u68B3\u7406\u4E00\u4E0B\u4F1A\u6709\u90A3\u4E9B\u60C5\u51B5\u89E6\u53D1\u664B\u5347:</p><ul><li>\u5DF2\u7ECF\u7ECF\u5386\u8FC7\u4E00\u6B21 Scavenge \u56DE\u6536\u3002</li><li>To\uFF08\u95F2\u7F6E\uFF09\u7A7A\u95F4\u7684\u5185\u5B58\u5360\u7528\u8D85\u8FC7 25%\u3002</li></ul><p>\u73B0\u5728\u8FDB\u5165\u5230\u8001\u751F\u4EE3\u7684\u5783\u573E\u56DE\u6536\u673A\u5236\u5F53\u4E2D\uFF0C\u8001\u751F\u4EE3\u4E2D\u7D2F\u79EF\u7684\u53D8\u91CF\u7A7A\u95F4\u4E00\u822C\u90FD\u662F\u5F88\u5927\u7684\uFF0C\u5F53\u7136\u4E0D\u80FD\u7528 Scavenge \u7B97\u6CD5\u5566\uFF0C\u6D6A\u8D39\u4E00\u534A\u7A7A\u95F4\u4E0D\u8BF4\uFF0C\u5BF9\u5E9E\u5927\u7684\u5185\u5B58\u7A7A\u95F4\u8FDB\u884C\u590D\u5236\u5C82\u4E0D\u662F\u52B3\u6C11\u4F24\u8D22\uFF1F</p><p>\u90A3\u4E48\u5BF9\u4E8E\u8001\u751F\u4EE3\u800C\u8A00\uFF0C\u7A76\u7ADF\u662F\u91C7\u53D6\u600E\u6837\u7684\u7B56\u7565\u8FDB\u884C\u5783\u573E\u56DE\u6536\u7684\u5462\uFF1F</p><p>\u7B2C\u4E00\u6B65\uFF0C\u8FDB\u884C<code>\u6807\u8BB0-\u6E05\u9664</code>\u3002\u8FD9\u4E2A\u8FC7\u7A0B\u5728\u300AJavaScript \u9AD8\u7EA7\u7A0B\u5E8F\u8BBE\u8BA1(\u7B2C\u4E09\u7248)\u300B\u4E2D\u6709\u8FC7\u8BE6\u7EC6\u7684\u4ECB\u7ECD\uFF0C\u4E3B\u8981\u5206\u6210\u4E24\u4E2A\u9636\u6BB5\uFF0C\u5373\u6807\u8BB0\u9636\u6BB5\u548C\u6E05\u9664\u9636\u6BB5\u3002\u9996\u5148\u4F1A\u904D\u5386\u5806\u4E2D\u7684\u6240\u6709\u5BF9\u8C61\uFF0C\u5BF9\u5B83\u4EEC\u505A\u4E0A\u6807\u8BB0\uFF0C\u7136\u540E\u5BF9\u4E8E\u4EE3\u7801\u73AF\u5883\u4E2D<code>\u4F7F\u7528\u7684\u53D8\u91CF</code>\u4EE5\u53CA<code>\u88AB\u5F3A\u5F15\u7528</code>\u7684\u53D8\u91CF\u53D6\u6D88\u6807\u8BB0\uFF0C\u5269\u4E0B\u7684\u5C31\u662F\u8981\u5220\u9664\u7684\u53D8\u91CF\u4E86\uFF0C\u5728\u968F\u540E\u7684\u6E05\u9664\u9636\u6BB5\u5BF9\u5176\u8FDB\u884C\u7A7A\u95F4\u7684\u56DE\u6536\u3002</p><p>\u5F53\u7136\u8FD9\u53C8\u4F1A\u5F15\u53D1\u5185\u5B58\u788E\u7247\u7684\u95EE\u9898\uFF0C\u5B58\u6D3B\u5BF9\u8C61\u7684\u7A7A\u95F4\u4E0D\u8FDE\u7EED\u5BF9\u540E\u7EED\u7684\u7A7A\u95F4\u5206\u914D\u9020\u6210\u969C\u788D\u3002\u8001\u751F\u4EE3\u53C8\u662F\u5982\u4F55\u5904\u7406\u8FD9\u4E2A\u95EE\u9898\u7684\u5462\uFF1F</p><p>\u7B2C\u4E8C\u6B65\uFF0C\u6574\u7406\u5185\u5B58\u788E\u7247\u3002V8 \u7684\u89E3\u51B3\u65B9\u5F0F\u975E\u5E38\u7B80\u5355\u7C97\u66B4\uFF0C\u5728\u6E05\u9664\u9636\u6BB5\u7ED3\u675F\u540E\uFF0C\u628A\u5B58\u6D3B\u7684\u5BF9\u8C61\u5168\u90E8\u5F80\u4E00\u7AEF\u9760\u62E2\u3002</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/v8-gc5.png" alt=""></p><p>\u7531\u4E8E\u662F\u79FB\u52A8\u5BF9\u8C61\uFF0C\u5B83\u7684\u6267\u884C\u901F\u5EA6\u4E0D\u53EF\u80FD\u5F88\u5FEB\uFF0C\u4E8B\u5B9E\u4E0A\u4E5F\u662F\u6574\u4E2A\u8FC7\u7A0B\u4E2D\u6700\u8017\u65F6\u95F4\u7684\u90E8\u5206\u3002</p><h3 id="\u589E\u91CF\u6807\u8BB0" tabindex="-1">\u589E\u91CF\u6807\u8BB0 <a class="header-anchor" href="#\u589E\u91CF\u6807\u8BB0" aria-hidden="true">#</a></h3><p>\u7531\u4E8E JS \u7684\u5355\u7EBF\u7A0B\u673A\u5236\uFF0CV8 \u5728\u8FDB\u884C\u5783\u573E\u56DE\u6536\u7684\u65F6\u5019\uFF0C\u4E0D\u53EF\u907F\u514D\u5730\u4F1A\u963B\u585E\u4E1A\u52A1\u903B\u8F91\u7684\u6267\u884C\uFF0C\u5018\u82E5\u8001\u751F\u4EE3\u7684\u5783\u573E\u56DE\u6536\u4EFB\u52A1\u5F88\u91CD\uFF0C\u90A3\u4E48\u8017\u65F6\u4F1A\u975E\u5E38\u53EF\u6015\uFF0C\u4E25\u91CD\u5F71\u54CD\u5E94\u7528\u7684\u6027\u80FD\u3002</p><p>\u90A3\u8FD9\u4E2A\u65F6\u5019\u4E3A\u4E86\u907F\u514D\u8FD9\u6837\u95EE\u9898\uFF0CV8 \u91C7\u53D6\u4E86\u589E\u91CF\u6807\u8BB0\u7684\u65B9\u6848\uFF0C<strong>\u5373\u5C06\u4E00\u53E3\u6C14\u5B8C\u6210\u7684\u6807\u8BB0\u4EFB\u52A1\u5206\u4E3A\u5F88\u591A\u5C0F\u7684\u90E8\u5206\u5B8C\u6210\uFF0C\u6BCF\u505A\u5B8C\u4E00\u4E2A\u5C0F\u7684\u90E8\u5206\u5C31&quot;\u6B47&quot;\u4E00\u4E0B</strong>\uFF0C\u5C31 js \u5E94\u7528\u903B\u8F91\u6267\u884C\u4E00\u4F1A\u513F\uFF0C\u7136\u540E\u518D\u6267\u884C\u4E0B\u9762\u7684\u90E8\u5206\uFF0C\u5982\u679C\u5FAA\u73AF\uFF0C\u76F4\u5230\u6807\u8BB0\u9636\u6BB5\u5B8C\u6210\u624D\u8FDB\u5165\u5185\u5B58\u788E\u7247\u7684\u6574\u7406\u4E0A\u9762\u6765\u3002</p>',37),t=[p];function i(o,r,l,d,h,g){return n(),a("div",null,t)}const _=e(s,[["render",i]]);export{m as __pageData,_ as default};