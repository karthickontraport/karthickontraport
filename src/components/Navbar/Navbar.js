/* eslint-disable eqeqeq */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Box } from "../common/Layout";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <Container>
      <Box>
        <p>Photo</p>
      </Box>
      <Box>
        <ul>
          <li>
            <Link to="/contacts">Contacts</Link>
            <Link to="/parchace">parchace</Link>
          </li>
        </ul>
      </Box>
    </Container>
  );
}
