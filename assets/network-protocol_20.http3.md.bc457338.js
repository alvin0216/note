import{_ as t,c as T,o as p,a as e}from"./app.218f227b.js";const I=JSON.parse('{"title":"HTTP3 \u5C55\u671B","description":"","frontmatter":{"title":"HTTP3 \u5C55\u671B","date":"2018-09-25T13:00:28.000Z","sidebar":"auto","tags":["http2"],"categories":["\u7F51\u7EDC\u534F\u8BAE"]},"headers":[{"level":2,"title":"HTTP/2 \u7684\u201C\u961F\u5934\u963B\u585E\u201D","slug":"http-2-\u7684\u201C\u961F\u5934\u963B\u585E\u201D","link":"#http-2-\u7684\u201C\u961F\u5934\u963B\u585E\u201D","children":[]},{"level":2,"title":"QUIC \u534F\u8BAE","slug":"quic-\u534F\u8BAE","link":"#quic-\u534F\u8BAE","children":[]},{"level":2,"title":"QUIC \u7684\u7279\u70B9","slug":"quic-\u7684\u7279\u70B9","link":"#quic-\u7684\u7279\u70B9","children":[]},{"level":2,"title":"QUIC \u5185\u90E8\u7EC6\u8282","slug":"quic-\u5185\u90E8\u7EC6\u8282","link":"#quic-\u5185\u90E8\u7EC6\u8282","children":[]},{"level":2,"title":"HTTP/3 \u534F\u8BAE","slug":"http-3-\u534F\u8BAE","link":"#http-3-\u534F\u8BAE","children":[]},{"level":2,"title":"HTTP/3 \u670D\u52A1\u53D1\u73B0","slug":"http-3-\u670D\u52A1\u53D1\u73B0","link":"#http-3-\u670D\u52A1\u53D1\u73B0","children":[]},{"level":2,"title":"\u5C0F\u7ED3","slug":"\u5C0F\u7ED3","link":"#\u5C0F\u7ED3","children":[]}],"relativePath":"network-protocol/20.http3.md","lastUpdated":1661882834000}'),a={name:"network-protocol/20.http3.md"},r=e('<p>\u5728\u524D\u9762\u7684\u4E24\u8BB2\u91CC\uFF0C\u6211\u4EEC\u4E00\u8D77\u5B66\u4E60\u4E86 HTTP/2\uFF0C\u4F60\u4E5F\u5E94\u8BE5\u770B\u5230\u4E86 HTTP/2 \u505A\u51FA\u7684\u8BB8\u591A\u52AA\u529B\uFF0C\u6BD4\u5982\u5934\u90E8\u538B\u7F29\u3001\u4E8C\u8FDB\u5236\u5206\u5E27\u3001\u865A\u62DF\u7684\u201C\u6D41\u201D\u4E0E\u591A\u8DEF\u590D\u7528\uFF0C\u6027\u80FD\u65B9\u9762\u6BD4 HTTP/1 \u6709\u4E86\u5F88\u5927\u7684\u63D0\u5347\uFF0C\u201C\u57FA\u672C\u4E0A\u201D\u89E3\u51B3\u4E86\u201C\u961F\u5934\u963B\u585E\u201D\u8FD9\u4E2A\u201C\u8001\u5927\u96BE\u201D\u95EE\u9898\u3002</p><h2 id="http-2-\u7684\u201C\u961F\u5934\u963B\u585E\u201D" tabindex="-1">HTTP/2 \u7684\u201C\u961F\u5934\u963B\u585E\u201D <a class="header-anchor" href="#http-2-\u7684\u201C\u961F\u5934\u963B\u585E\u201D" aria-hidden="true">#</a></h2><p>\u7B49\u7B49\uFF0C\u4F60\u53EF\u80FD\u8981\u53D1\u51FA\u7591\u95EE\u4E86\uFF1A\u4E3A\u4EC0\u4E48\u8BF4\u662F\u201C\u57FA\u672C\u4E0A\u201D\uFF0C\u800C\u4E0D\u662F\u201C\u5B8C\u5168\u201D\u89E3\u51B3\u4E86\u5462\uFF1F</p><p>\u8FD9\u662F\u56E0\u4E3A HTTP/2 \u867D\u7136\u4F7F\u7528\u201C\u5E27\u201D\u201C\u6D41\u201D\u201C\u591A\u8DEF\u590D\u7528\u201D\uFF0C\u6CA1\u6709\u4E86\u201C\u961F\u5934\u963B\u585E\u201D\uFF0C\u4F46\u8FD9\u4E9B\u624B\u6BB5\u90FD\u662F\u5728\u5E94\u7528\u5C42\u91CC\uFF0C\u800C\u5728\u4E0B\u5C42\uFF0C\u4E5F\u5C31\u662F TCP \u534F\u8BAE\u91CC\uFF0C\u8FD8\u662F\u4F1A\u53D1\u751F\u201C\u961F\u5934\u963B\u585E\u201D</p><p>\u8FD9\u662F\u600E\u4E48\u56DE\u4E8B\u5462\uFF1F</p><p>\u8BA9\u6211\u4EEC\u4ECE\u534F\u8BAE\u6808\u7684\u89D2\u5EA6\u6765\u4ED4\u7EC6\u770B\u4E00\u4E0B\u3002\u5728 HTTP/2 \u628A\u591A\u4E2A\u201C\u8BF7\u6C42 - \u54CD\u5E94\u201D\u5206\u89E3\u6210\u6D41\uFF0C\u4EA4\u7ED9 TCP \u540E\uFF0CTCP \u4F1A\u518D\u62C6\u6210\u66F4\u5C0F\u7684\u5305\u4F9D\u6B21\u53D1\u9001\uFF08\u5176\u5B9E\u5728 TCP \u91CC\u5E94\u8BE5\u53EB segment\uFF0C\u4E5F\u5C31\u662F\u201C\u6BB5\u201D\uFF09\u3002</p><p>\u5728\u7F51\u7EDC\u826F\u597D\u7684\u60C5\u51B5\u4E0B\uFF0C\u5305\u53EF\u4EE5\u5F88\u5FEB\u9001\u8FBE\u76EE\u7684\u5730\u3002\u4F46\u5982\u679C\u7F51\u7EDC\u8D28\u91CF\u6BD4\u8F83\u5DEE\uFF0C\u50CF\u624B\u673A\u4E0A\u7F51\u7684\u65F6\u5019\uFF0C\u5C31\u6709\u53EF\u80FD\u4F1A\u4E22\u5305\u3002\u800C TCP \u4E3A\u4E86\u4FDD\u8BC1\u53EF\u9760\u4F20\u8F93\uFF0C\u6709\u4E2A\u7279\u522B\u7684\u201C<strong>\u4E22\u5305\u91CD\u4F20</strong>\u201D\u673A\u5236\uFF0C\u4E22\u5931\u7684\u5305\u5FC5\u987B\u8981\u7B49\u5F85\u91CD\u65B0\u4F20\u8F93\u786E\u8BA4\uFF0C\u5176\u4ED6\u7684\u5305\u5373\u4F7F\u5DF2\u7ECF\u6536\u5230\u4E86\uFF0C\u4E5F\u53EA\u80FD\u653E\u5728\u7F13\u51B2\u533A\u91CC\uFF0C\u4E0A\u5C42\u7684\u5E94\u7528\u62FF\u4E0D\u51FA\u6765\uFF0C\u53EA\u80FD\u201C\u5E72\u7740\u6025\u201D\u3002</p><p>\u6211\u4E3E\u4E2A\u7B80\u5355\u7684\u4F8B\u5B50\uFF1A</p><p>\u5BA2\u6237\u7AEF\u7528 TCP \u53D1\u9001\u4E86\u4E09\u4E2A\u5305\uFF0C\u4F46\u670D\u52A1\u5668\u6240\u5728\u7684\u64CD\u4F5C\u7CFB\u7EDF\u53EA\u6536\u5230\u4E86\u540E\u4E24\u4E2A\u5305\uFF0C\u7B2C\u4E00\u4E2A\u5305\u4E22\u4E86\u3002\u90A3\u4E48\u5185\u6838\u91CC\u7684 TCP \u534F\u8BAE\u6808\u5C31\u53EA\u80FD\u628A\u5DF2\u7ECF\u6536\u5230\u7684\u5305\u6682\u5B58\u8D77\u6765\uFF0C\u201C\u505C\u4E0B\u201D\u7B49\u7740\u5BA2\u6237\u7AEF\u91CD\u4F20\u90A3\u4E2A\u4E22\u5931\u7684\u5305\uFF0C\u8FD9\u6837\u5C31\u53C8\u51FA\u73B0\u4E86\u201C\u961F\u5934\u963B\u585E\u201D\u3002</p><p>\u7531\u4E8E\u8FD9\u79CD\u201C\u961F\u5934\u963B\u585E\u201D\u662F TCP \u534F\u8BAE\u56FA\u6709\u7684\uFF0C\u6240\u4EE5 HTTP/2 \u5373\u4F7F\u8BBE\u8BA1\u51FA\u518D\u591A\u7684\u201C\u82B1\u6837\u201D\u4E5F\u65E0\u6CD5\u89E3\u51B3\u3002</p><p>Google \u5728\u63A8 SPDY \u7684\u65F6\u5019\u5C31\u5DF2\u7ECF\u610F\u8BC6\u5230\u4E86\u8FD9\u4E2A\u95EE\u9898\uFF0C\u4E8E\u662F\u5C31\u53C8\u53D1\u660E\u4E86\u4E00\u4E2A\u65B0\u7684\u201CQUIC\u201D\u534F\u8BAE\uFF0C\u8BA9 HTTP \u8DD1\u5728 QUIC \u4E0A\u800C\u4E0D\u662F TCP \u4E0A\u3002</p><p>\u800C\u8FD9\u4E2A\u201CHTTP over QUIC\u201D\u5C31\u662F HTTP \u534F\u8BAE\u7684\u4E0B\u4E00\u4E2A\u5927\u7248\u672C\uFF0CHTTP/3\u3002\u5B83\u5728 HTTP/2 \u7684\u57FA\u7840\u4E0A\u53C8\u5B9E\u73B0\u4E86\u8D28\u7684\u98DE\u8DC3\uFF0C\u771F\u6B63\u201C\u5B8C\u7F8E\u201D\u5730\u89E3\u51B3\u4E86\u201C\u961F\u5934\u963B\u585E\u201D\u95EE\u9898\u3002</p><p>\u8FD9\u91CC\u5148\u8D34\u4E00\u4E0B HTTP/3 \u7684\u534F\u8BAE\u6808\u56FE\uFF0C\u8BA9\u4F60\u5BF9\u5B83\u6709\u4E2A\u5927\u6982\u7684\u4E86\u89E3\u3002</p><p><img src="https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/http3-vs-http.png" alt=""></p><h2 id="quic-\u534F\u8BAE" tabindex="-1">QUIC \u534F\u8BAE <a class="header-anchor" href="#quic-\u534F\u8BAE" aria-hidden="true">#</a></h2><p>\u4ECE\u8FD9\u5F20\u56FE\u91CC\uFF0C\u4F60\u53EF\u4EE5\u770B\u5230 HTTP/3 \u6709\u4E00\u4E2A\u5173\u952E\u7684\u6539\u53D8\uFF0C\u90A3\u5C31\u662F\u5B83\u628A\u4E0B\u5C42\u7684 TCP\u201C\u62BD\u6389\u201D\u4E86\uFF0C\u6362\u6210\u4E86 UDP\u3002\u56E0\u4E3A UDP \u662F\u65E0\u5E8F\u7684\uFF0C\u5305\u4E4B\u95F4\u6CA1\u6709\u4F9D\u8D56\u5173\u7CFB\uFF0C\u6240\u4EE5\u5C31\u4ECE\u6839\u672C\u4E0A\u89E3\u51B3\u4E86\u201C\u961F\u5934\u963B\u585E\u201D\u3002</p><p>\u4F60\u4E00\u5B9A\u77E5\u9053\uFF0C<strong>UDP \u662F\u4E00\u4E2A\u7B80\u5355\u3001\u4E0D\u53EF\u9760\u7684\u4F20\u8F93\u534F\u8BAE</strong>\uFF0C\u53EA\u662F\u5BF9 IP \u534F\u8BAE\u7684\u4E00\u5C42\u5F88\u8584\u7684\u5305\u88C5\uFF0C\u548C TCP \u76F8\u6BD4\uFF0C\u5B83\u5B9E\u9645\u5E94\u7528\u7684\u8F83\u5C11\u3002</p><p>\u4E0D\u8FC7\u6B63\u662F\u56E0\u4E3A\u5B83\u7B80\u5355\uFF0C<strong>\u4E0D\u9700\u8981\u5EFA\u8FDE\u548C\u65AD\u8FDE</strong>\uFF0C\u901A\u4FE1\u6210\u672C\u4F4E\uFF0C\u4E5F\u5C31\u975E\u5E38\u7075\u6D3B\u3001\u9AD8\u6548\uFF0C\u201C\u53EF\u5851\u6027\u201D\u5F88\u5F3A\u3002</p><p>\u6240\u4EE5\uFF0CQUIC \u5C31\u9009\u5B9A\u4E86 UDP\uFF0C\u5728\u5B83\u4E4B\u4E0A\u628A TCP \u7684\u90A3\u4E00\u5957\u8FDE\u63A5\u7BA1\u7406\u3001\u62E5\u585E\u7A97\u53E3\u3001\u6D41\u91CF\u63A7\u5236\u7B49\u201C\u642C\u201D\u4E86\u8FC7\u6765\uFF0C\u201C\u53BB\u5176\u7CDF\u7C95\uFF0C\u53D6\u5176\u7CBE\u534E\u201D\uFF0C\u6253\u9020\u51FA\u4E86\u4E00\u4E2A\u5168\u65B0\u7684\u53EF\u9760\u4F20\u8F93\u534F\u8BAE\uFF0C\u53EF\u4EE5\u8BA4\u4E3A\u662F\u201C<strong>\u65B0\u65F6\u4EE3\u7684 TCP</strong>\u201D\u3002</p><p>gQUIC \u6DF7\u5408\u4E86 UDP\u3001TLS\u3001HTTP\uFF0C\u662F\u4E00\u4E2A\u5E94\u7528\u5C42\u7684\u534F\u8BAE\u3002\u800C IETF \u5219\u5BF9 gQUIC \u505A\u4E86\u201C\u6E05\u7406\u201D\uFF0C\u628A\u5E94\u7528\u90E8\u5206\u5206\u79BB\u51FA\u6765\uFF0C\u5F62\u6210\u4E86 HTTP/3\uFF0C\u539F\u6765\u7684 UDP \u90E8\u5206\u201C\u4E0B\u653E\u201D\u5230\u4E86\u4F20\u8F93\u5C42\uFF0C\u6240\u4EE5 iQUIC \u6709\u65F6\u5019\u4E5F\u53EB\u201CQUIC-transport\u201D</p><p>\u63A5\u4E0B\u6765\u8981\u8BF4\u7684 QUIC \u90FD\u662F\u6307 iQUIC\uFF0C\u8981\u8BB0\u4F4F\uFF0C\u5B83\u4E0E\u65E9\u671F\u7684 gQUIC \u4E0D\u540C\uFF0C\u662F\u4E00\u4E2A\u4F20\u8F93\u5C42\u7684\u534F\u8BAE\uFF0C\u548C TCP \u662F\u5E73\u7EA7\u7684\u3002</p><h2 id="quic-\u7684\u7279\u70B9" tabindex="-1">QUIC \u7684\u7279\u70B9 <a class="header-anchor" href="#quic-\u7684\u7279\u70B9" aria-hidden="true">#</a></h2><p>QUIC \u57FA\u4E8E UDP\uFF0C\u800C UDP \u662F\u201C\u65E0\u8FDE\u63A5\u201D\u7684\uFF0C\u6839\u672C\u5C31\u4E0D\u9700\u8981\u201C\u63E1\u624B\u201D\u548C\u201C\u6325\u624B\u201D\uFF0C\u6240\u4EE5\u5929\u751F\u5C31\u8981\u6BD4 TCP \u5FEB\u3002</p><p>\u5C31\u50CF TCP \u5728 IP \u7684\u57FA\u7840\u4E0A\u5B9E\u73B0\u4E86\u53EF\u9760\u4F20\u8F93\u4E00\u6837\uFF0CQUIC \u4E5F\u57FA\u4E8E UDP \u5B9E\u73B0\u4E86\u53EF\u9760\u4F20\u8F93\uFF0C<strong>\u4FDD\u8BC1\u6570\u636E\u4E00\u5B9A\u80FD\u591F\u62B5\u8FBE\u76EE\u7684\u5730</strong>\u3002\u5B83\u8FD8\u5F15\u5165\u4E86\u7C7B\u4F3C HTTP/2 \u7684\u201C\u6D41\u201D\u548C\u201C\u591A\u8DEF\u590D\u7528\u201D\uFF0C\u5355\u4E2A\u201C\u6D41\u201D\u662F\u6709\u5E8F\u7684\uFF0C\u53EF\u80FD\u4F1A\u56E0\u4E3A\u4E22\u5305\u800C\u963B\u585E\uFF0C\u4F46\u5176\u4ED6\u201C\u6D41\u201D\u4E0D\u4F1A\u53D7\u5230\u5F71\u54CD\u3002</p><p>\u4E3A\u4E86\u9632\u6B62\u7F51\u7EDC\u4E0A\u7684\u4E2D\u95F4\u8BBE\u5907\uFF08Middle Box\uFF09\u8BC6\u522B\u534F\u8BAE\u7684\u7EC6\u8282\uFF0CQUIC \u5168\u9762\u91C7\u7528\u52A0\u5BC6\u901A\u4FE1\uFF0C\u53EF\u4EE5\u5F88\u597D\u5730\u62B5\u5FA1\u7A9C\u6539\u548C\u201C\u534F\u8BAE\u50F5\u5316\u201D\uFF08ossification\uFF09\u3002</p><p>\u800C\u4E14\uFF0C\u56E0\u4E3A TLS1.3 \u5DF2\u7ECF\u5728\u53BB\u5E74\uFF082018\uFF09\u6B63\u5F0F\u53D1\u5E03\uFF0C\u6240\u4EE5 QUIC \u5C31\u76F4\u63A5\u5E94\u7528\u4E86 TLS1.3\uFF0C\u987A\u4FBF\u4E5F\u5C31\u83B7\u5F97\u4E86 0-RTT\u30011-RTT \u8FDE\u63A5\u7684\u597D\u5904\u3002</p><p>\u4F46 QUIC \u5E76\u4E0D\u662F\u5EFA\u7ACB\u5728 TLS \u4E4B\u4E0A\uFF0C\u800C\u662F\u5185\u90E8\u201C\u5305\u542B\u201D\u4E86 TLS\u3002\u5B83\u4F7F\u7528\u81EA\u5DF1\u7684\u5E27\u201C\u63A5\u7BA1\u201D\u4E86 TLS \u91CC\u7684\u201C\u8BB0\u5F55\u201D\uFF0C\u63E1\u624B\u6D88\u606F\u3001\u8B66\u62A5\u6D88\u606F\u90FD\u4E0D\u4F7F\u7528 TLS \u8BB0\u5F55\uFF0C\u76F4\u63A5\u5C01\u88C5\u6210 QUIC \u7684\u5E27\u53D1\u9001\uFF0C\u7701\u6389\u4E86\u4E00\u6B21\u5F00\u9500\u3002</p><h2 id="quic-\u5185\u90E8\u7EC6\u8282" tabindex="-1">QUIC \u5185\u90E8\u7EC6\u8282 <a class="header-anchor" href="#quic-\u5185\u90E8\u7EC6\u8282" aria-hidden="true">#</a></h2><p>\u7531\u4E8E QUIC \u5728\u534F\u8BAE\u6808\u91CC\u6BD4\u8F83\u504F\u5E95\u5C42\uFF0C\u6240\u4EE5\u6211\u53EA\u7B80\u7565\u4ECB\u7ECD\u4E24\u4E2A\u5185\u90E8\u7684\u5173\u952E\u77E5\u8BC6\u70B9\u3002</p><p>QUIC \u7684\u57FA\u672C\u6570\u636E\u4F20\u8F93\u5355\u4F4D\u662F<strong>\u5305</strong>\uFF08packet\uFF09\u548C<strong>\u5E27</strong>\uFF08frame\uFF09\uFF0C\u4E00\u4E2A\u5305\u7531\u591A\u4E2A\u5E27\u7EC4\u6210\uFF0C\u5305\u9762\u5411\u7684\u662F\u201C\u8FDE\u63A5\u201D\uFF0C\u5E27\u9762\u5411\u7684\u662F\u201C\u6D41\u201D\u3002</p><p>QUIC \u4F7F\u7528\u4E0D\u900F\u660E\u7684\u201C<strong>\u8FDE\u63A5 ID</strong>\u201D\u6765\u6807\u8BB0\u901A\u4FE1\u7684\u4E24\u4E2A\u7AEF\u70B9\uFF0C\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u53EF\u4EE5\u81EA\u884C\u9009\u62E9\u4E00\u7EC4 ID \u6765\u6807\u8BB0\u81EA\u5DF1\uFF0C\u8FD9\u6837\u5C31\u89E3\u9664\u4E86 TCP \u91CC\u8FDE\u63A5\u5BF9\u201CIP \u5730\u5740 + \u7AEF\u53E3\u201D\uFF08\u5373\u5E38\u8BF4\u7684\u56DB\u5143\u7EC4\uFF09\u7684\u5F3A\u7ED1\u5B9A\uFF0C\u652F\u6301\u201C<strong>\u8FDE\u63A5\u8FC1\u79FB</strong>\u201D\uFF08Connection Migration\uFF09\u3002</p><p><img src="https://static001.geekbang.org/resource/image/ae/3b/ae0c482ea0c3b8ebc71924b19feb9b3b.png" alt=""></p><p>\u6BD4\u5982\u4F60\u4E0B\u73ED\u56DE\u5BB6\uFF0C\u624B\u673A\u4F1A\u81EA\u52A8\u7531 4G \u5207\u6362\u5230 WiFi\u3002\u8FD9\u65F6 IP \u5730\u5740\u4F1A\u53D1\u751F\u53D8\u5316\uFF0CTCP \u5C31\u5FC5\u987B\u91CD\u65B0\u5EFA\u7ACB\u8FDE\u63A5\u3002\u800C QUIC \u8FDE\u63A5\u91CC\u7684\u4E24\u7AEF\u8FDE\u63A5 ID \u4E0D\u4F1A\u53D8\uFF0C\u6240\u4EE5\u8FDE\u63A5\u5728\u201C\u903B\u8F91\u4E0A\u201D\u6CA1\u6709\u4E2D\u65AD\uFF0C\u5B83\u5C31\u53EF\u4EE5\u5728\u65B0\u7684 IP \u5730\u5740\u4E0A\u7EE7\u7EED\u4F7F\u7528\u4E4B\u524D\u7684\u8FDE\u63A5\uFF0C\u6D88\u9664\u91CD\u8FDE\u7684\u6210\u672C\uFF0C\u5B9E\u73B0\u8FDE\u63A5\u7684\u65E0\u7F1D\u8FC1\u79FB\u3002</p><p>QUIC \u7684\u5E27\u91CC\u6709\u591A\u79CD\u7C7B\u578B\uFF0CPING\u3001ACK \u7B49\u5E27\u7528\u4E8E\u7BA1\u7406\u8FDE\u63A5\uFF0C\u800C STREAM \u5E27\u4E13\u95E8\u7528\u6765\u5B9E\u73B0\u6D41\u3002</p><p>QUIC \u91CC\u7684\u6D41\u4E0E HTTP/2 \u7684\u6D41\u975E\u5E38\u76F8\u4F3C\uFF0C\u4E5F\u662F\u5E27\u7684\u5E8F\u5217\uFF0C\u4F60\u53EF\u4EE5\u5BF9\u6BD4\u7740\u6765\u7406\u89E3\u3002\u4F46 HTTP/2 \u91CC\u7684\u6D41\u90FD\u662F\u53CC\u5411\u7684\uFF0C\u800C QUIC \u5219\u5206\u4E3A\u53CC\u5411\u6D41\u548C\u5355\u5411\u6D41\u3002</p><p><img src="https://static001.geekbang.org/resource/image/9a/10/9ab3858bf918dffafa275c400d78d910.png" alt=""></p><p>QUIC \u5E27\u666E\u904D\u91C7\u7528\u53D8\u957F\u7F16\u7801\uFF0C\u6700\u5C11\u53EA\u8981 1 \u4E2A\u5B57\u8282\uFF0C\u6700\u591A\u6709 8 \u4E2A\u5B57\u8282\u3002\u6D41 ID \u7684\u6700\u5927\u53EF\u7528\u4F4D\u6570\u662F 62\uFF0C\u6570\u91CF\u4E0A\u6BD4 HTTP/2 \u7684 2^31 \u5927\u5927\u589E\u52A0\u3002</p><p>\u6D41 ID \u8FD8\u4FDD\u7559\u4E86\u6700\u4F4E\u4E24\u4F4D\u7528\u4F5C\u6807\u5FD7\uFF0C\u7B2C 1 \u4F4D\u6807\u8BB0\u6D41\u7684\u53D1\u8D77\u8005\uFF0C0 \u8868\u793A\u5BA2\u6237\u7AEF\uFF0C1 \u8868\u793A\u670D\u52A1\u5668\uFF1B\u7B2C 2 \u4F4D\u6807\u8BB0\u6D41\u7684\u65B9\u5411\uFF0C0 \u8868\u793A\u53CC\u5411\u6D41\uFF0C1 \u8868\u793A\u5355\u5411\u6D41\u3002</p><p>\u6240\u4EE5 QUIC \u6D41 ID \u7684\u5947\u5076\u6027\u8D28\u548C HTTP/2 \u521A\u597D\u76F8\u53CD\uFF0C\u5BA2\u6237\u7AEF\u7684 ID \u662F\u5076\u6570\uFF0C\u4ECE 0 \u5F00\u59CB\u8BA1\u6570\u3002</p><h2 id="http-3-\u534F\u8BAE" tabindex="-1">HTTP/3 \u534F\u8BAE <a class="header-anchor" href="#http-3-\u534F\u8BAE" aria-hidden="true">#</a></h2><p>\u4E86\u89E3\u4E86 QUIC \u4E4B\u540E\uFF0C\u518D\u6765\u770B HTTP/3 \u5C31\u5BB9\u6613\u591A\u4E86\u3002</p><p>\u56E0\u4E3A QUIC \u672C\u8EAB\u5C31\u5DF2\u7ECF\u652F\u6301\u4E86\u52A0\u5BC6\u3001\u6D41\u548C\u591A\u8DEF\u590D\u7528\uFF0C\u6240\u4EE5 HTTP/3 \u7684\u5DE5\u4F5C\u51CF\u8F7B\u4E86\u5F88\u591A\uFF0C\u628A\u6D41\u63A7\u5236\u90FD\u4EA4\u7ED9 QUIC \u53BB\u505A\u3002\u8C03\u7528\u7684\u4E0D\u518D\u662F TLS \u7684\u5B89\u5168\u63A5\u53E3\uFF0C\u4E5F\u4E0D\u662F Socket API\uFF0C\u800C\u662F\u4E13\u95E8\u7684 QUIC \u51FD\u6570\u3002\u4E0D\u8FC7\u8FD9\u4E2A\u201CQUIC \u51FD\u6570\u201D\u8FD8\u6CA1\u6709\u5F62\u6210\u6807\u51C6\uFF0C\u5FC5\u987B\u8981\u7ED1\u5B9A\u5230\u67D0\u4E00\u4E2A\u5177\u4F53\u7684\u5B9E\u73B0\u5E93\u3002</p><p>HTTP/3 \u91CC\u4ECD\u7136\u4F7F\u7528\u6D41\u6765\u53D1\u9001\u201C\u8BF7\u6C42 - \u54CD\u5E94\u201D\uFF0C\u4F46\u5B83\u81EA\u8EAB\u4E0D\u9700\u8981\u50CF HTTP/2 \u90A3\u6837\u518D\u53BB\u5B9A\u4E49\u6D41\uFF0C\u800C\u662F\u76F4\u63A5\u4F7F\u7528 QUIC \u7684\u6D41\uFF0C\u76F8\u5F53\u4E8E\u505A\u4E86\u4E00\u4E2A\u201C\u6982\u5FF5\u6620\u5C04\u201D\u3002</p><p>HTTP/3 \u91CC\u7684\u201C\u53CC\u5411\u6D41\u201D\u53EF\u4EE5\u5B8C\u5168\u5BF9\u5E94\u5230 HTTP/2 \u7684\u6D41\uFF0C\u800C\u201C\u5355\u5411\u6D41\u201D\u5728 HTTP/3 \u91CC\u7528\u6765\u5B9E\u73B0\u63A7\u5236\u548C\u63A8\u9001\uFF0C\u8FD1\u4F3C\u5730\u5BF9\u5E94 HTTP/2 \u7684 0 \u53F7\u6D41\u3002</p><p>\u7531\u4E8E\u6D41\u7BA1\u7406\u88AB\u201C\u4E0B\u653E\u201D\u5230\u4E86 QUIC\uFF0C\u6240\u4EE5 HTTP/3 \u91CC\u5E27\u7684\u7ED3\u6784\u4E5F\u53D8\u7B80\u5355\u4E86\u3002</p><p>\u5E27\u5934\u53EA\u6709\u4E24\u4E2A\u5B57\u6BB5\uFF1A\u7C7B\u578B\u548C\u957F\u5EA6\uFF0C\u800C\u4E14\u540C\u6837\u90FD\u91C7\u7528\u53D8\u957F\u7F16\u7801\uFF0C\u6700\u5C0F\u53EA\u9700\u8981\u4E24\u4E2A\u5B57\u8282\u3002</p><p><img src="https://static001.geekbang.org/resource/image/26/5b/2606cbaa1a2e606a3640cc1825f5605b.png" alt=""></p><p>HTTP/3 \u91CC\u7684\u5E27\u4ECD\u7136\u5206\u6210\u6570\u636E\u5E27\u548C\u63A7\u5236\u5E27\u4E24\u7C7B\uFF0CHEADERS \u5E27\u548C DATA \u5E27\u4F20\u8F93\u6570\u636E\uFF0C\u4F46\u5176\u4ED6\u4E00\u4E9B\u5E27\u56E0\u4E3A\u5728\u4E0B\u5C42\u7684 QUIC \u91CC\u6709\u4E86\u66FF\u4EE3\uFF0C\u6240\u4EE5\u5728 HTTP/3 \u91CC\u5C31\u90FD\u6D88\u5931\u4E86\uFF0C\u6BD4\u5982 RST_STREAM\u3001WINDOW_UPDATE\u3001PING \u7B49\u3002</p><p>\u5934\u90E8\u538B\u7F29\u7B97\u6CD5\u5728 HTTP/3 \u91CC\u5347\u7EA7\u6210\u4E86\u201C<strong>QPACK</strong>\u201D\uFF0C\u4F7F\u7528\u65B9\u5F0F\u4E0A\u4E5F\u505A\u4E86\u6539\u53D8\u3002\u867D\u7136\u4E5F\u5206\u6210\u9759\u6001\u8868\u548C\u52A8\u6001\u8868\uFF0C\u4F46\u5728\u6D41\u4E0A\u53D1\u9001 HEADERS \u5E27\u65F6\u4E0D\u80FD\u66F4\u65B0\u5B57\u6BB5\uFF0C\u53EA\u80FD\u5F15\u7528\uFF0C\u7D22\u5F15\u8868\u7684\u66F4\u65B0\u9700\u8981\u5728\u4E13\u95E8\u7684\u5355\u5411\u6D41\u4E0A\u53D1\u9001\u6307\u4EE4\u6765\u7BA1\u7406\uFF0C\u89E3\u51B3\u4E86 HPACK \u7684\u201C\u961F\u5934\u963B\u585E\u201D\u95EE\u9898\u3002</p><p>\u53E6\u5916\uFF0CQPACK \u7684\u5B57\u5178\u4E5F\u505A\u4E86\u4F18\u5316\uFF0C\u9759\u6001\u8868\u7531\u4E4B\u524D\u7684 61 \u4E2A\u589E\u52A0\u5230\u4E86 98 \u4E2A\uFF0C\u800C\u4E14\u5E8F\u53F7\u4ECE 0 \u5F00\u59CB\uFF0C\u4E5F\u5C31\u662F\u8BF4\u201C:authority\u201D\u7684\u7F16\u53F7\u662F 0\u3002</p><h2 id="http-3-\u670D\u52A1\u53D1\u73B0" tabindex="-1">HTTP/3 \u670D\u52A1\u53D1\u73B0 <a class="header-anchor" href="#http-3-\u670D\u52A1\u53D1\u73B0" aria-hidden="true">#</a></h2><p>\u8BB2\u4E86\u8FD9\u4E48\u591A\uFF0C\u4E0D\u77E5\u9053\u4F60\u6CE8\u610F\u5230\u4E86\u6CA1\u6709\uFF1AHTTP/3 \u6CA1\u6709\u6307\u5B9A\u9ED8\u8BA4\u7684\u7AEF\u53E3\u53F7\uFF0C\u4E5F\u5C31\u662F\u8BF4\u4E0D\u4E00\u5B9A\u975E\u8981\u5728 UDP \u7684 80 \u6216\u8005 443 \u4E0A\u63D0\u4F9B HTTP/3 \u670D\u52A1\u3002</p><p>\u90A3\u4E48\uFF0C\u8BE5\u600E\u4E48\u201C\u53D1\u73B0\u201DHTTP/3 \u5462\uFF1F</p><p>\u8FD9\u5C31\u8981\u7528\u5230 HTTP/2 \u91CC\u7684\u201C\u6269\u5C55\u5E27\u201D\u4E86\u3002\u6D4F\u89C8\u5668\u9700\u8981\u5148\u7528 HTTP/2 \u534F\u8BAE\u8FDE\u63A5\u670D\u52A1\u5668\uFF0C\u7136\u540E\u670D\u52A1\u5668\u53EF\u4EE5\u5728\u542F\u52A8 HTTP/2 \u8FDE\u63A5\u540E\u53D1\u9001\u4E00\u4E2A\u201CAlt-Svc\u201D\u5E27\uFF0C\u5305\u542B\u4E00\u4E2A\u201Ch3=host:port\u201D\u7684\u5B57\u7B26\u4E32\uFF0C\u544A\u8BC9\u6D4F\u89C8\u5668\u5728\u53E6\u4E00\u4E2A\u7AEF\u70B9\u4E0A\u63D0\u4F9B\u7B49\u4EF7\u7684 HTTP/3 \u670D\u52A1\u3002</p><p>\u6D4F\u89C8\u5668\u6536\u5230\u201CAlt-Svc\u201D\u5E27\uFF0C\u4F1A\u4F7F\u7528 QUIC \u5F02\u6B65\u8FDE\u63A5\u6307\u5B9A\u7684\u7AEF\u53E3\uFF0C\u5982\u679C\u8FDE\u63A5\u6210\u529F\uFF0C\u5C31\u4F1A\u65AD\u5F00 HTTP/2 \u8FDE\u63A5\uFF0C\u6539\u7528\u65B0\u7684 HTTP/3 \u6536\u53D1\u6570\u636E\u3002</p><h2 id="\u5C0F\u7ED3" tabindex="-1">\u5C0F\u7ED3 <a class="header-anchor" href="#\u5C0F\u7ED3" aria-hidden="true">#</a></h2><p>HTTP/3 \u57FA\u4E8E QUIC \u534F\u8BAE\uFF0C\u5B8C\u5168\u89E3\u51B3\u4E86\u201C\u961F\u5934\u963B\u585E\u201D\u95EE\u9898\uFF0C\u5F31\u7F51\u73AF\u5883\u4E0B\u7684\u8868\u73B0\u4F1A\u4F18\u4E8E HTTP/2\uFF1B</p><p>QUIC \u662F\u4E00\u4E2A\u65B0\u7684\u4F20\u8F93\u5C42\u534F\u8BAE\uFF0C\u5EFA\u7ACB\u5728 UDP \u4E4B\u4E0A\uFF0C\u5B9E\u73B0\u4E86\u53EF\u9760\u4F20\u8F93\uFF1B</p><p>QUIC \u5185\u542B\u4E86 TLS1.3\uFF0C\u53EA\u80FD\u52A0\u5BC6\u901A\u4FE1\uFF0C\u652F\u6301 0-RTT \u5FEB\u901F\u5EFA\u8FDE\uFF1B</p><p>QUIC \u7684\u8FDE\u63A5\u4F7F\u7528\u201C\u4E0D\u900F\u660E\u201D\u7684\u8FDE\u63A5 ID\uFF0C\u4E0D\u7ED1\u5B9A\u5728\u201CIP \u5730\u5740 + \u7AEF\u53E3\u201D\u4E0A\uFF0C\u652F\u6301\u201C\u8FDE\u63A5\u8FC1\u79FB\u201D\uFF1B</p><p>QUIC \u7684\u6D41\u4E0E HTTP/2 \u7684\u6D41\u5F88\u76F8\u4F3C\uFF0C\u4F46\u5206\u4E3A\u53CC\u5411\u6D41\u548C\u5355\u5411\u6D41\uFF1B</p><p>HTTP/3 \u6CA1\u6709\u6307\u5B9A\u9ED8\u8BA4\u7AEF\u53E3\u53F7\uFF0C\u9700\u8981\u7528 HTTP/2 \u7684\u6269\u5C55\u5E27\u201CAlt-Svc\u201D\u6765\u53D1\u73B0\u3002</p>',62),i=[r];function P(n,s,c,h,o,l){return p(),T("div",null,i)}const d=t(a,[["render",P]]);export{I as __pageData,d as default};
