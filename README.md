![header](/public/README-Image.png)

# Authentication with Credentials NextAuth.js Example

This is an example of of using [NextAuth.js](https://next-auth.js.org/) Credentials provider to implement sign-up and sign-in using email and password.
The intent of this example is to show the authentication process, including account creation, sign-in, sign-out and saving user session to the browser with Recoil and Recoil Persist.

## Getting Started

### Main dependencies

- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Recoil](https://recoiljs.org/)
- [Recoil-Persist](https://www.npmjs.com/package/recoil-persist)

### Setting Up Your Environment

Change the name of `.env.local.example` to `.env.local`, and fill in the following values:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=somereallysecretsecret
DATABASEURL=YourDatabaseURL
```

Note: If you're planning to use a database service other than MySQL, make sure to update `datasource provider` in `prisma/schema.prisma`.

## Running the Example

You can use the following commands to run the example:

```
npm install
npx prisma generate
npm run dev
```

## Live Demo

A live demo of the example can be found [here](https://credentials-next-auth-example.vercel.app/).

## License

ISC
