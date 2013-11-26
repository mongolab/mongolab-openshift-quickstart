MongoLab OpenShift Quickstart (Node.js and MongoDB)
-----------------------------

###Step 1. Create an OpenShift account and application###

Create an account at [http://openshift.redhat.com](http://openshift.redhat.com/) and install the **rhc** command line tool on your development machine. For more info about rhc, see [https://openshift.redhat.com/community/developers/rhc-client-tools-install](https://openshift.redhat.com/community/developers/rhc-client-tools-install).

Once rhc is installed, create a **nodejs-0.6** application using the path to this repository as the ```--from-code``` argument and by replacing <app name> with your desired application name:

```
> rhc app create <app name> nodejs-0.6 --from-code https://github.com/mongolab/mongolab-openshift-quickstart
> cd <app name>
```
rhc initializes your application using this repository as a baseline.

###Step 2. Create a MongoLab account and database###

1. Sign up for an account at [http://www.mongolab.com](http://www.mongolab.com). When successful, a database landing page with no databases displays.
1. Create a database. Be sure to specify a database user name and password. These credentials are **not** the same as your MongoLab account credentials.
1. Click on your database. The database landing page provides a mongodb URI connection string of the form:   
```
  mongodb://<user>:<password>@host.mongolab.com:12345/my-db-name
```
1. Copy this value somewhere helpful and replace placeholders with your database user credentials.

###Step 3. Commit and deploy the app###
When you created your app, the rhc command line client automatically initialized a git repo with a remote link to OpenShift. The code is also already deployed to your app gear.

If you don't make any changes, you can skip this step. However, if you make any modifications (now or later), perform the following to update the code on the gear:

```
    git add .
    git commit -m "my first commmit"
    git push
```

###Step 4. Configure environment variables on the app gear###
The example code uses ```mongodb://localhost:27017/test``` when the MONGOLAB_URI environment variable is not available. This is sufficient for testing locally with your own mongodb, but not for production.

Fortunately, the rhc client allows you to configure your environment variable without placing credentials in a repository (see [Custom Environment Variables](https://www.openshift.com/blogs/new-online-features-for-september-2013) for more information). Use the following commands configure your production URI and restart your app.

```
    rhc env set MONGOLAB_URI='<db uri>' --app <app name>
    rhc app restart --app <app name>
```

**db uri** is the mongodb URI you obtained in Step 2, with your database user credentials added.

**Note:** Though there are repository-driven methods for configuring this environment variable that meet your requirements, we find that configuring this value outside of the code (and not storing it in a repository) allows for maximum security and flexibility.

###Step 5. View the app###

Visit your deployed app at:

```
    http://<app name>-<app namespace>.rhcloud.com
```

###Questions?
Email [support@mongolab.com](mailto:support@mongolab.com)
