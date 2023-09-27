import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { createContext, useContext, useState } from "react";
import Cart from "./components/Cart";
import Info from "./components/Info";
import CreditCard from "./components/CreditCard";
import Check from "./components/Check";
import HeaderForPages from "./components/HeaderForPages";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import MouseLight from "./components/MouseLight";
import Header from "./components/Header";
import TicketPrice from "./components/TicketPrice";

import GroupBooking from "./components/GroupBooking";
import GroupBookingFin from "./components/GroupBookingFin";
import BookingInquiry from "./components/BookingInquiry";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <HeaderForPages />

        <Sidebar />
        <Switch>
          <Route component={TicketPrice} exact path={"/ticketPrice"} />

          <Route component={GroupBooking} path="/groupBooking" />
          <Route component={GroupBookingFin} path="/groupBookingFin" />
          <Route component={BookingInquiry} path="/bookingInquiry" />

          <Route path="/Ticket/Cart" component={Cart} exact />

          <Route path="/Ticket/Info" component={Info} exact />

          <Route path="/Ticket/CreditCard" component={CreditCard} exact />

          <Route path="/Ticket/Check" component={Check} exact />
        </Switch>

        <Footer
          link1="回到首頁"
          link2="預約訂票"
          link3="場館導覽"
          link4="聯絡我們"
          link5="常見問答"
          linkHref1="/"
          linkHref2="/"
          linkHref3="/"
          linkHref4="/"
          linkHref5="/"
        />

        <MouseLight />
      </BrowserRouter>
    </>
  );
}

export default App;
