import React from "react"
import {connect, Global, Head, css, styled} from "frontity"
import Switch from "@frontity/components/switch"

import {Container, Row, Col} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import List from "./list"
import Post from "./post"
import Page from "./page"
import Title from "./title"
import BsNavbar from "./navbar"
import Pagetitle from "./pagetitle";

// TODO: create more meaningful components

const Root = ({state}) => {
    // Retrieve data from frontity state of current link (url)
    const data = state.source.get(state.router.link)
    const page = state.source[data.type][data.id]


    // Get current Date and set the year for use in footer
    let currentDate = new Date()
    let thisYear = currentDate.getFullYear()
    let theYears = (2021 == thisYear) ? thisYear : '2021 - ' + thisYear

    // Get Brandname from frontity theme state for use in Navbar
    const brandname = state.theme.brandname

    // Set styles path
    let bootstrapStyles = "https://nikolas-frontend-styles.vercel.app/css/nikolas-styles.css"
    return (
        <>
           <Title />
           <Head>
                <link
                    rel="stylesheet"
                    href={bootstrapStyles}
                />
            </Head>

            <Global
                styles={globalStyle}
            />
            <main>
                <BsNavbar />
                <Pagetitle />
                <Container fluid="md">
                    <Row>
                        <Col>
                            <Switch>
                                <List when={data.isArchive}/>
                                <Post when={data.isPost}/>
                                <Page when={data.isPage}/>
                                <div when={data.isError}>ERROR this page was not found!</div>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer className="container">
                <hr/>
                <p>&copy; {theYears} {brandname}</p>
            </footer>
        </>
    )
}

export default connect(Root)

const globalStyle = css`
                  img {
                    max-width: 100%;
                  }
                ` // don't forget the backtick
