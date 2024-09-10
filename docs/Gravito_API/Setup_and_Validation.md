Setup and Validation
First Party domain means the domain your website operates. e.g. website.com. To avoid third party cookies being blocked (occurs already on many browsers) you can configure the CMP to set the cookies under first party domain or you can use Gravito’s first party API to store and retrieve other valuable profile data.

To get started with first party setup, you first need to set up domain in Gravito’s admin panel, https://admin.gravito.net


Setup of first party domain, step 1.
Once you have configured your domain gto.website.com, you need to do the DNS changes for your domain. These steps are varying between different DNS providers, generally you have to configure three records:


First party domain configuration, step 2.
After you have made the DNS records (A, TXT and CNAME), allow the changes to propagate to DNS servers (few minutes at least) and then press “Validate” button. After succesful validation you should see domain status as “Validated”: