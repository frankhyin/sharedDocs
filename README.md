# sharedDocs
This is SharedDocs, an emulation of Google Docs created by three Horizons students, Frank Yin, Matt Forjan, and David Roccapriore over a week. 

To get started, first set up the [backend](https://github.com/frankhyin/sharedDocsBackend) if you haven't already. 

Remember to NPM install. 

Then, create an env.sh. All you need is the same JSON Web Token secret that you wrote for the backend's env.sh. 
It should look something like this: 
```export JWT_SECRET="somestring"```

After that, in your console, type:
```electron-forge start```

You should be able to access our app now. Enjoy!
