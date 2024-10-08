Version 2
=========

First party API / Microprofile
------------------------------

Most common use for first party microprofile is to store CMP consents and other metadata on it. That configuration is automatically generated by CMP configurator, just select "with backend" option when generating the deployment script and choose right first party domain from the menu.

The properties that can be managed with with a First party Microprofile V2 looks like this.

```
{
  "id": "<microprofileid>",
  "referer": "<originDomain>",
  "events": { "key1":"value1",
              "key2":"value2"
   }
}
```

*Note: The features available in the Microprofile has been improved a lot in the version 3. You can look at the documentation here.*

If there would be other needs to use microprofile to act as keyring store, store context analytics results (e.g. segments) or something similar, the calls to first party API microprofile would look something like this:

Get profile

```
(function gtoFirstParty() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://gto.<<domain>>/api/v2/firstparty', true);
  xhr.withCredentials = true;
  xhr.onreadystatechange = function(response) {
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      console.log("1P echo : " + response.target.response);
    }
  }
  xhr.send();
})();
```

Send data to profile

```
(function gtoFirstParty() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://gto.<<domain>>/api/v2/firstparty?attribute1=value1', true);
  xhr.withCredentials = true;
  xhr.onreadystatechange = function(response) {
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      console.log("1P echo : " + response.target.response);
    }
  }
  xhr.send();
})();

Connect cookies across domains, this can be done e.g. using user ID:
```

```
(function gtoFirstParty() {​
  var xhr = new XMLHttpRequest();​
  xhr.open("POST", 'https://gto.<<domain>>/api/v2/firstparty?matchOnId=123', true);  ​
  xhr.withCredentials = true;​
  xhr.onreadystatechange = function(response) {​
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {​
      console.log("1P echo : " + response.target.response);​
    } ​
  }​
xhr.send();​
})();
```

matchOnID is the only reserved key value pair, it allows retrieving the cookie set for particular ID (e.g. logged in user has UID known) from other domain. A user with a matchOnId can be dealt with in 3 different ways to change the particular Id associated in 3 different ways.

-   reset
    -   Reset value for the matchOnId can be used to clear all the values from the events key value pair temporarily.
-   disconnect
    -   Disconnect value for the matchOnId can be used to remove the matchOnId from the events key value pair.
-   delete
    -   Delete keyword for the matchOnId can be used to delete the whole events and the existing microProfileId provided.
    -   This operation will reset the microProfileId and give you a new one.

Note: In all these cases passing the matchOnId value for a particular ID (e.g. logged in user has UID known) can resurface the whole profile again for your convenience.