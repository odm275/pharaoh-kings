import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/login/">Go to Sign In</Link>
    <Link to="/signup/">Go to Sign Up</Link>
  </Layout>
)

export default IndexPage
