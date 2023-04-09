Currently it is only usable by me because .env is in my local machine.
I am looking out for ways to allow public to use my website, either through secure API keys or account authentication?

Update 10/4 2:56am
Just found out GitHub pages generally supports static pages, not dynamic. And I do not yet know how to host my backend node.js server. Currently the app is unable to send any request to /completions to get a response because my backend is currently running on my localhost port 8000, not a public url. So until I host my node.js server publicly, the only way to use my app is to fork my repo, add your API KEY in .env file and run 2 commands:
  1. In first terminal, run 'npm run start-frontend' for the react frontend application
  1. In another terminal, run 'npm run start-backend' for the node.js server
