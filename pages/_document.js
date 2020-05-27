// // zamiast stosować global state: _document jkest renderowany po stronie serwera tylko
// // i może trzymać (persist) info o zalogowanym lub nie (o cookies)

// import Document, { Head, Main, NextScript } from 'next/document';
// import { getServerSideToken, getUserScript } from '../lib/auth';

// export default class MyDocument extends Document {
//   // to pozwoli nam pobrać z zalogowanego token i przekazać do skryptu z funkcją getUserScript
//   static async getInitialProps(ctx) {
//     console.log(ctx);
    
//     const props = await Document.getInitialProps(ctx);
//     const userData = await getServerSideToken(ctx.req);

//     return { ...props, ...userData }
//   }

//   render() {
//     const { user = {} } = this.props;

//     return (
//       <html>
//         <Head />
//         <body>
//           <Main />
//           <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }}></script>
//           <NextScript/>
//         </body>
//       </html>
//     )
//   }
// }

import Document, { Head, Main, NextScript } from 'next/document'
import { getUserScript } from '../lib/auth'
 
export default class MyDocument extends Document {  
  render() {
    
    const { user } = this.props.__NEXT_DATA__.props
    console.log("MyDocument -> render -> user", user)
 
    return(
      <html>
        <Head />
        <body>
          <Main { ...user} />
          <script dangerouslySetInnerHTML={ { __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    )
  }
}

