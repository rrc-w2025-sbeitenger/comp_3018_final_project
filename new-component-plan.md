# COMPONENT 1: MULTER
Integrating Multer would work great for my API, I would configure the middleware on the /maps routes.
Multer can be used directly in a route as middleware and handle uploading images of current Marathon maps,
which then I can have clients retrieve images of all the playable maps.

# COMPONENT 2: Deployment
For deployment I will use Render.com since the webpage offers a free option and can be integrated with git.
Render seems to have an seamless auto deployment option where it does all the networking and monitoring allowing
me to mainly foucs on my API code while still having the option of extra configuration. Render also seems to
have an extensive amount of easy to follow documention that can support the implementation/configuration.
From Render docs on deployment: "Render triggers a deploy as soon as you push or merge a change to your linked branch.
This is the default behavior for a new service. After CI Checks Pass With each change to your linked branch, Render
triggers a deploy only after all of your repo's CI checks pass".