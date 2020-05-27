import Layout from '../components/Layout';
import Link from 'next/link';
// import {getUserProfile } from '../lib/auth'

export default function Index(props) {
  console.log(props)
  
  
  return (
    <Layout title="Home" { ...props }>
      <Link href="/profile">
        <a>Go to profile</a>
      </Link>
    </Layout>
  )
}

// Index.getInitialProps = getUserProfile()
