<h1 align="center">
  ADCP Developer Support Portal
</h1>

This project contains the source code for our Developer Support Portal, built with Gatsby and deployed using GitLab Pages.

---

**Table of Contents**

- [GitLab CI](#gitlab-ci)
- [Building locally](#building-locally)
- [Did you fork this project?](#did-you-fork-this-project)
- [Quick start](#-quick-start)
- [Learning gatsby](#-learning-gatsby)

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## GitLab CI

This project's static Pages are built by [GitLab CI][ci], following the steps
defined in [`.gitlab-ci.yml`](.gitlab-ci.yml):

```yml
image: node:latest

# This folder is cached between builds
# http://docs.gitlab.com/ce/ci/yaml/README.html#cache
cache:
  paths:
    - node_modules/
    # Enables git-lab CI caching. Both .cache and public must be cached, otherwise builds will fail.
    - .cache/
    - public/
pages:
  script:
    - yarn install
    - ./node_modules/.bin/gatsby build --prefix-paths
  artifacts:
    paths:
      - public
  only:
    - master
```

## Gitlab pages specifications

*Source : https://www.gatsbyjs.org/docs/deploying-to-gitlab-pages*

>>>
### Add Path Prefix to Gatsby

As the site will be hosted under yourname.gitlab.io/examplerepository/, you will need to configure Gatsby to use the Path Prefix plugin.

In the `gatsby-config.js`, set the `pathPrefix` to be added to your site's link paths. The `pathPrefix` should be the project name in your repository. (ex. `https://gitlab.com/yourname/examplerepository/` - your `pathPrefix` should be `/examplerepository`). See [the docs page on path prefixing for more](/docs/path-prefix/).

```js:title=gatsby-config.js
module.exports = {
  pathPrefix: `/examplerepository`,
}
```

### Build and deploy with GitLab CI

The CI platform uses Docker images/containers, so `image: "node:lts-alpine"` tells the CI to use the latest node image. `cache:` caches the `node_modules` folder in between builds, so subsequent builds should be a lot faster as it doesn't have to reinstall all the dependencies required. `pages:` is the name of the CI stage. You can have multiple stages, e.g. 'Test', 'Build', 'Deploy' etc. `script:` starts the next part of the CI stage, telling it to start running the below scripts inside the image selected. `npm install` and `./node_modules/.bin/gatsby build --prefix-paths` will install all dependencies, and start the static site build, respectively.

`./node_modules/.bin/gatsby build --prefix-paths` was used so you don't have to install gatsby-cli to build the image, as it has already been included and installed with `npm install`. `--prefix-paths` was used because _without_ that flag, Gatsby ignores your pathPrefix. `artifacts:` and `paths:` are used to tell GitLab Pages
where the static files are kept. `only:` and `master` tells the CI to only run the above instructions when the master branch is deployed.

Add that configuration, and with the next master branch push, your site should have been built correctly. This can be checked by going to your repository on GitLab, and selecting CI/CD in the sidebar. This will then show you a log of all jobs that have either succeeded or failed. You can click on the failed status, and then select the job to get more information about why your build may have failed.

If all went well, you should now be able to access your site. It will be hosted under gitlab.io - for example if you have a repository under your namespace, the url will be yourname.gitlab.io/examplerepository.

Visit the [GitLab Pages](https://gitlab.com/help/user/project/pages/getting_started_part_one.md) to learn how to setup custom domains and find out about advanced configurations.
>>>

## Building locally

To work locally with this project, you'll have to follow the steps below:

1. Fork, clone or download this project
1. [Install] Gatsby CLI
1. Generate and preview the website with hot-reloading: `gatsby develop`
1. Add content

Read more at Gatsby's [documentation].

## Did you fork this project?

If you forked this project for your own use, please go to your project's
**Settings** and remove the forking relationship, which won't be necessary
unless you want to contribute back to the upstream project.

[ci]: https://about.gitlab.com/gitlab-ci/
[Gatsby]: https://www.gatsbyjs.org/
[install]: https://www.gatsbyjs.org/docs/gatsby-cli/
[documentation]: https://www.gatsbyjs.org/docs/
[userpages]: https://docs.gitlab.com/ce/user/project/pages/introduction.html#user-or-group-pages
[projpages]: https://docs.gitlab.com/ce/user/project/pages/introduction.html#project-pages

----

*Source : [github:gatsbyjs/gatsby-starter-default/README.md](https://github.com/gatsbyjs/gatsby-starter-default/blob/master/README.md)*

>>>
## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```shell
    # create a new Gatsby site using the default starter
    gatsby new my-default-starter https://gitlab.com/pages/gatsby
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd gatsby/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
>>>
----

Forked from https://github.com/gatsbyjs/gatsby-starter-default
