Microprofile
============

**Microprofile which relies on Gravito Firstparty API v3 is in Beta testing**

Gravito Microprofile is sort of a synonym to first party API. First party API was initially developed as simple microservice to help with setting first party cookie to hold CMP settings and consents. As more advanced requirements started to surface we thought that calling the service “microprofile” would be reasonable.

**Micro means simple, right?**

Wish it was. However, the general idea is pretty simple. We store various types of attributes to a cookie that is set from server-side by API served from sub-domain associated with your domain. Two reasons why:

1) server-side cookie lasts longer than cookies set by javascript running on client

2) API operating on your domain avoids the blocking of third party cookies (now and the future)

**How does it work?**

First learn about setting up First Party API, after registering your domain(s) you are ready to roll: (Example provided based on [Version 3](https://docs.gravito.net/Gravito_API/Version_3_%28Latest%29)

```javascript
(function () { 
  var xhr = new XMLHttpRequest(); 
  var params = { 
  "e": {
    "matchOnId": "dem05", 
    "id1": "xyz", 
    "counterPageView":"2" 
  }, 
  "k": [{
          "i":"1", 
          "k":"GAID", 
          "v": "2700108e-b965-4d98-b214-274b0701725a" 
        }, 
        {  
          "i":"2", 
          "k":"OMID", 
          "v": "cb115185-2a25-4587-8ff5-e3fe7cc7a25b" 
        }
  ], 
  "c": [
     { "i":"t", 
       "c":"consent2", 
       "s": false 
     }, 
     { "i":"m", 
       "c":"consent2", 
       "s": false 
     }
  ] 
};
 
xhr.open("POST", 'https://gto.<yourdomain>/api/v3/firstparty', true); 
xhr.withCredentials = true; 
xhr.onreadystatechange = function(response) { 
  if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) { 
      console.log("POST response : " + response.target.response); 
  } 
} 

xhr.send(JSON.stringify(params)); 
})();
``` 

**Looks heavy?** Let’s open the structure of “params” a bit. It consists of three main branches:

**“e” stands for** _**events**_, that is any key/value pairs that you might need to store into microprofile. Only restricted key name is “**matchOnId**” which we use to connect microprofiles to each other when there is e.g. hash of user email available, ie. user has logged in and microprofile can be associated to a person. Further on matchOnId has two reserved values: 1) “disconnect” allows you to disassociate microprofile from login but keep the history and 2) “reset” performs disconnect and wipes the microprofile to default stage.

**“k” stands for** _**keyring**_, allowing any key/value pairs stored inside keyring. Functionality is somewhat the same as with events but adding/modifying a key is recorded with timestamp, that allows to link the consents collected to these keys (and whether the keys can be used for whatever purpose they were recorded). Keyring (“k”) has fixed structure:

```
"i":"keyId", -> string"k":"keyName", -> string"v": "keyValue" -> string
``` 

When sending requests to API you will notice that keyring items will have timestamp “t” set by the API, containing timestamp in epochtime.

**“c” stands for** _**consents**_, that is to collect the consents received from CMP. Again the behavior follows the key/value pairs approach but with fixed structure:

`   "i":"consentId", -> string"c":"consentName", -> string"s":  status as true or false -> bool   `

Same as with keyring, the timestamp of adding/modifying particular consentId is recorded and returned in API responses. This allows to monitor that when consents are changed and how those turning points connect to collected IDs in keyring (allowing or preventing further activities within integrated systems).

**Limitations**

In our microprofile ( basically a server-side cookie that holds key-value pairs, consents and keys), especially the _**events**_  supports storing various data types—we support longer values like TCstrings, but there are some practical size limits to keep in mind. To maintain compatibility, the profile size should stay below 5KB, with a safe limit of 2KB for headers to avoid issues. Exceeding these limits, can choke the webservers (for. eg: on AWS, this could result in added costs or even failed requests). To work within these boundaries, we recommend encoding data into a shorter format whenever possible. 

*Note*: We compress the profile data, which often reduces 5KB down to 1-2KB depending on the data density. However, heavy use of cookies or extra headers can still push limits, especially in browser or network handling, so it's wise to keep only relevant information in these profiles.