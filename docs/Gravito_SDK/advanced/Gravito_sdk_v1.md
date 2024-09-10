Gravito SDK V1
==============

Using SDK V1
------------

Version 1.0.10 added support for custom functions to call before initializing CMP and call back when backend data is available. This is useful for any type of integration with backend API that can store the consents (and perhaps other profile information). Example deployment, defining custom backend sync interval (60 secs), default is 1800 secs (30 mins):

```
window.gravitoCMPConfig = gravitoCMPConfig;

gravitoCMPConfig.core.syncAfter=60;

function getCmpData() {
            //data fetching logic  here
            var date = new Date("06/30/2022")
            var domain = window.location.hostname
            var value = null
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://gto.gravito.net/api/firstparty', true);
            xhr.withCredentials = true;
            xhr.onreadystatechange = function (response) {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    console.log("1P response : " + response.target.response);
                    var result = JSON.parse(response.target.response)
                    if (result.events) {
                        var gdata = result.events.gravitoData ? JSON.parse(result.events.gravitoData) : null
                        value = gdata ? gdata.TCString : null
                        if (value) {
                            document.cookie =
                                "TcString" +
                                "=" +
                                value +
                                "; expires=" +
                                date.toGMTString() +
                                "; path=/; domain=" +
                                domain;
                        }
                        if (gdata) {
                            document.cookie =
                                "gravitoData" +
                                "=" +
                                JSON.stringify(gdata) +
                                "; expires=" +
                                date.toGMTString() +
                                "; path=/; domain=" +
                                domain;
                        }

                    }
                    var obj = {
                        senderId: "gravitoCMPSuperWrapper",
                        status: "ready",
                    };
                    window.postMessage(obj, "*");
                }
            }
            xhr.send();

        }
        function postCmpData(data) {
            console.log("data", data)
            var gravitoData = JSON.stringify(data)
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://gto.gravito.net/api/firstparty?gravitoData=' + gravitoData, true);
            xhr.withCredentials = true;
            xhr.onreadystatechange = function (response) {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    console.log("1P response : " + response.target.response);
                }
            }
            xhr.send();
        }
        var gravitoSdkTag = document.createElement("script");
        gravitoSdkTag.src = "https://cdn.gravito.net/sdk/gravitoSDK_latest.js";
        gravitoSdkTag.onload = function () {
            window.gravito.ready(function () {
                gravito.initTCFCMPWithCustomBackend(getCmpData, function () {
                    gravito.initTCFCMP(
                        "https://cdn.gravito.net/tcf-v2",
                        "https://cdn.gravito.net/cmpbuilds",
                        "bundle_latest_2"
                    );
                }, postCmpData)
            });
        };
document.body.appendChild(gravitoSdkTag);
```