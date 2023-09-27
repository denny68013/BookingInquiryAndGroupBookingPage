var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var bcrypt = require("bcryptjs");
const generator = require("serial-number-generator");
app.use(cors());
const formData = require("form-data");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  // host: "smtp.mailgun.org",
  // port: 587,
  // auth: {
  //   user: "postmaster@sandboxcb8f545f2d5d4c1a9563dfb8d0f696c5.mailgun.org",
  //   pass: "b2c488bbd269f1e63e51eefe9d0b3dca-7ca144d2-0a4e92e0",
  // },

  service: "gmail",
  auth: {
    user: "aquarmfee41@gmail.com",
    pass: "rxreedqsnweoegzn",
  },
});

var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  port: 3306,
  database: "aquar_database",
});
conn.connect();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  req.mysql = conn;
  req.mysql.queryAsync = function (cmd, params) {
    return new Promise(function (resolve, reject) {
      req.mysql.query(cmd, params, function (err, data) {
        resolve(data);
      });
    });
  };

  next();
});

app.get("/groupBooking", function (req, res) {
  res.send("hello");
});

app.post("/groupBooking", async function (req, res) {
  console.log(req.body);
  var sql =
    "INSERT INTO `group_reservation_main` ( `contact_person_name`, `adult_tickets`, `student_tickets`, `child_tickets`, `charity_tickets`, `contact_person_phone`, `contact_person_email`, `date`, `session`, `notes`) VALUES (?,?,?,?,?,?,?,?,?,?)";

  var data = [
    req.body.contactName,
    req.body.adultTicket,
    req.body.studentTicket,
    req.body.childTicket,
    req.body.charityTicket,
    req.body.contactPhone,
    req.body.contactEmail,
    req.body.selectedDate,
    req.body.selectedSession,
    req.body.noteText,
  ];
  console.log(data);
  await conn.query(sql, data, function (err, rows) {
    let isDone = "notDone";
    console.log("HEREER");
    if (err) {
      console.log("err2");
      res.send(err);
    } else {
      transporter
        .sendMail({
          from: "aquarmfee41@gmail.com",
          to: req.body.contactEmail,
          subject: "我們已經收到您對AquaR團體預約的申請！",
          html: `<p style="font-size:24px">${req.body.contactName} 您好，我們已經收到您送出於 ${req.body.selectedDate} 場次 ${req.body.selectedSession}:00 的團體預約申請，預約是成人票${req.body.adultTicket}張、學生票${req.body.studentTicket}張、孩童票${req.body.childTicket}張、博愛票${req.body.charityTicket}張，我們會於3-5個工作天內回覆，感謝您！</p>`,
        })
        .then((info) => {
          console.log("电子邮件已成功发送：", info);
        })
        .catch((error) => {
          console.error("发送电子邮件时出错：", error);
        });
      isDone = "Done";
      res.send(isDone);
    }
  });
  // var result = await req.mysql.queryAsync(sql, data);
  // res.send(result);
});

app.post("/bookingInquiry", async function (req, res) {
  console.log(req.body);
  let sql =
    "select * from orderlist where customer_id_number = ? and customer_phone=? and valid=?";

  let data = [req.body.orderPersonId, req.body.orderPersonPhone, "1"];
  console.log(data);
  await conn.query(sql, data, async function (err, orderRows) {
    let isDone = "notDone";
    if (err) {
      res.status(500).send(err);
    } else {
      if (orderRows[0]) {
        const ticketSql =
          "select * from ticket where order_id = ? and (valid = ? or valid=?) ORDER BY FIELD(SUBSTRING(ticket_type , 1 , 1), 'A', 'S','K','C')";
        const ticketData = [orderRows[0].order_id, "1", "2"];
        await conn.query(ticketSql, ticketData, function (err, ticketRows) {
          if (err) {
            res.send(err);
          } else {
            const responseData = {
              orderData: orderRows,
              ticketData: ticketRows,
            };
            console.log(responseData);
            res.status(200).json(responseData);
          }
        });
      } else {
        res.status(500).send(err);
        console.log(err);
      }
    }
  });
  // var result = await req.mysql.queryAsync(sql, data);
  // res.send(result);
});

app.post("/bookingInquiryTicket", async function (req, res) {
  console.log(req.body);
  let sql = "select * from ticket where order_id=? and valid=? ";
  let data = [req.body.orderTicketId, "1"];
  console.log(data);
  await conn.query(sql, data, async function (err, orderTicketRows) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(orderTicketRows);
    }
  });
});

app.patch("/bookingInquiryRefund", async function (req, res) {
  let sql = "update ticket set valid=? where ticket_id=?";

  // console.log(data);

  for (let i = 0; i < req.body.refundTicketId.length; i++) {
    console.log(req.body.refundTicketId[i]);
    let data = ["2", req.body.refundTicketId[i]];
    await conn.query(sql, data, async function (err, refundTicketRows) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(refundTicketRows);
      }
    });
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// ============ 俐蓁新增

// 購物車⬇️
app.get("/Ticket/Cart", function (req, res) {
  res.send("hello");
});

// 產生票券進資料庫
app.post("/Ticket/Cart", async function (req, res) {
  // console.log(req.body,'進');
  let sql =
    "INSERT INTO `ticket` ( `ticket_id`, `ticket_type`, `qrcode`, `valid`, `order_id`, `date`, `session`) VALUES (?,?,?,?,?,?,?)";
  const ticket_id = req.body.ticket_id;
  const qrcode = await bcrypt.hash(ticket_id, 12);
  // const order_id = generator.generateSerial(10);

  let ticketType = (e) => {
    switch (e) {
      case "成人票":
        return "A";
        break;
      case "學生票":
        return "S";
        break;
      case "孩童票":
        return "K";
        break;
      case "博愛票":
        return "C";
        break;
      default:
        return "錯誤";
        break;
    }
  };

  let ticket_type = ticketType(req.body.ticket_type);

  var data = [
    ticket_id,
    ticket_type,
    qrcode,
    req.body.valid,
    req.body.order_id,
    req.body.date,
    req.body.session,
  ];

  await conn.query(sql, data, function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      res.send(isDone);
    }
  });
  // console.log(data);
});

// 更改剩餘票券總數
app.post("/Ticket/Cart/ChangeQuantity", async function (req, res) {
  console.log(req.body, "-----");

  // 抓剩票數量
  let sql2 =
    "SELECT `remaining_quantity` FROM `amount` WHERE `date`=? AND `session`=?";
  let data2 = [req.body.date, req.body.session];

  await conn.query(sql2, data2, function (err, rows) {
    let isDone = "notDone2";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done2";

      // 修改剩票
      const remainingQuantity = rows[0].remaining_quantity;
      const updatedQuantity = remainingQuantity - req.body.total;

      let sql3 =
        "UPDATE `amount` SET `remaining_quantity`=? WHERE `date`=? AND `session`=?";
      let sql4 =
        "UPDATE `amount` SET `remaining_quantity` = ?, `available` = ? WHERE `date` = ? AND `session` = ?";

      if (updatedQuantity === 0) {
        conn.query(
          sql4,
          [updatedQuantity, 0, req.body.date, req.body.session],
          function (err, rows) {
            let isDone = "notDone3";
            if (err) {
              res.send(err);
            } else {
              isDone = "Done3";
              res.send(isDone);
              // console.log(updatedQuantity);
            }
          }
        );
      } else {
        conn.query(
          sql3,
          [updatedQuantity, req.body.date, req.body.session],
          function (err, rows) {
            let isDone = "notDone3";
            if (err) {
              res.send(err);
            } else {
              isDone = "Done3";
              res.send(isDone);
              console.log(updatedQuantity, "-----");
            }
          }
        );
      }
    }
  });
  console.log(data2);
});

// 可選日期
app.get("/Ticket/Cart/DateSelect", async function (req, res) {
  // console.log(req.query);
  var sql = "SELECT `date` FROM `amount` WHERE `available`= 1";

  await conn.query(sql, function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      // res.send(isDone);
      res.send({ isDone, data: rows }); // 返回数据给前端
    }
  });
  // console.log(data);
});

// 可選場次
app.post("/Ticket/Cart/SessionSelect", async function (req, res) {
  // console.log(req.body);
  var sql =
    "SELECT `session` FROM `amount` WHERE `available` = 1 AND `date` = ?";

  await conn.query(sql, [req.body.date], function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      res.send({ isDone, data: rows });
    }
  });
});

// 計算票券是否足夠

app.post("/Ticket/Cart/Ava", async function (req, res) {
  console.log(req.body);
  // 抓剩票數量
  let sql =
    "SELECT `remaining_quantity` FROM `amount` WHERE `date`=? AND `session`=?";
  let data = [req.body.date, req.body.session];

  await conn.query(sql, data, function (err, rows) {
    let isDone = "notDone-AvailableCheck";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done-AvailableCheck";
      console.log(isDone);
      console.log(rows);

      // 確認總數是否 > 剩餘數量
      const remainingQuantity = rows[0].remaining_quantity;
      console.log(remainingQuantity);

      if (req.body.total > remainingQuantity) {
        res.send("SoldOut");
      } else {
        res.send("Available");
      }
    }
  });
});

// 取消票券

app.post("/Ticket/cancelTicket", async function (req, res) {
  // console.log(req.body);
  let sql = "DELETE FROM `ticket` WHERE `order_id` = ?";

  await conn.query(sql, [req.body.OrderID], function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      console.log(req.body, "CAN");

      isDone = "Done";
      res.send({ isDone, data: rows });
    }
  });
});

// 取消已修改的剩票

app.post("/Ticket/cancelOrderChangeremain", async function (req, res) {
  // console.log(req.body);
  // 抓剩票數量
  let sql2 =
    "SELECT `remaining_quantity` FROM `amount` WHERE `date`=? AND `session`=?";
  let data2 = [req.body.date, req.body.session];

  await conn.query(sql2, data2, function (err, rows) {
    let isDone = "notDone2";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done2";

      // 修改剩票
      const remainingQuantity = rows[0].remaining_quantity;
      const updatedQuantity = remainingQuantity + req.body.count;

      let sql3 =
        "UPDATE `amount` SET `remaining_quantity`=? WHERE `date`=? AND `session`=?";
      let sql4 =
        "UPDATE `amount` SET `remaining_quantity` = ?, `available` = ? WHERE `date` = ? AND `session` = ?";

      if (remainingQuantity === 0) {
        conn.query(
          sql4,
          [updatedQuantity, 1, req.body.date, req.body.session],
          function (err, rows) {
            let isDone = "notDone3";
            if (err) {
              res.send(err);
            } else {
              isDone = "Done3";
              res.send(isDone);
              // console.log(updatedQuantity);
            }
          }
        );
      } else {
        conn.query(
          sql3,
          [updatedQuantity, req.body.date, req.body.session],
          function (err, rows) {
            let isDone = "notDone3";
            if (err) {
              res.send(err);
            } else {
              isDone = "Done3";
              res.send(isDone);
              // console.log(updatedQuantity);
            }
          }
        );
      }
    }
  });
});

// 取消訂單insert

app.post("/Ticket/CancelOrder", async function (req, res) {
  console.log(req.body);
  let sql = "DELETE FROM `orderlist` WHERE `order_id` = ?";

  await conn.query(sql, [req.body.OrderID], function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      res.send({ isDone, data: rows });
    }
  });
});

// 填資料⬇️

app.get("/Ticket/Info", function (req, res) {
  res.send("hello");
});

app.post("/Ticket/Info", async function (req, res) {
  console.log(req.body);
  var sql =
    "INSERT INTO `orderlist` ( `order_id`, `customer_email`, `customer_name`, `customer_phone`, `customer_id_number`, `ticket_pickup_method`, `pickup_person_name`, `pickup_person_id_number`, `date`, `session`, `adult_tickets`, `student_tickets` , `child_tickets`, `charity_tickets`, `valid`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  var data = [
    req.body.order_id,
    req.body.customer_email,
    req.body.customer_name,
    req.body.customer_phone,
    req.body.customer_id_number,
    req.body.ticket_pickup_method,
    req.body.pickup_person_name,
    req.body.pickup_person_id_number,
    req.body.date,
    req.body.session,
    req.body.adult_tickets,
    req.body.student_tickets,
    req.body.child_tickets,
    req.body.charity_tickets,
    req.body.valid,
  ];
  await conn.query(sql, data, function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      res.send(isDone);
    }
  });
  console.log(data);
  // var result = await req.mysql.queryAsync(sql, data);
  // res.send(result);
});

// 信用卡⬇️

app.post("/Ticket/CreditCard", async function (req, res) {
  console.log(req.body);
  var sql =
    "INSERT INTO `card` (`order_id`, `CardNumber`, `CardDeadlineMonth`, `CardDeadlineYear`, `CardLastThree`) VALUES (?,?,?,?,?)";

  var data = [
    req.body.order_id,
    req.body.CardNumber,
    req.body.CardDeadlineMonth,
    req.body.CardDeadlineYear,
    req.body.CardLastThree,
  ];
  await conn.query(sql, data, function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      res.send(isDone);
    }
  });
  console.log(data);
  // var result = await req.mysql.queryAsync(sql, data);
  // res.send(result);
});

// 訂單明細⬇️

app.get("/Ticket/Check", function (req, res) {
  res.send("hello");
});

// 票的內容
app.post("/Ticket/Cart/CheckList", async function (req, res) {
  let sql =
    "SELECT `ticket_id`, `ticket_type`, `qrcode` FROM `ticket` WHERE `order_id`=? ORDER BY FIELD(SUBSTRING(ticket_type , 1 , 1), 'A', 'S','K','C')";

  let data = req.body.OrderID;

  await conn.query(sql, data, function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      // res.send(isDone);
      res.send({ isDone, data: rows });
    }
  });
  // console.log(data);
});

// 明細內容
app.post("/Ticket/Cart/OrderListInCheck", async function (req, res) {
  let sql =
    "SELECT `order_time`, `customer_name`, `date`,`session`,`adult_tickets`, `student_tickets`, `child_tickets`, `charity_tickets`,`ticket_pickup_method`,`order_id`   FROM `orderlist` WHERE `order_id`=?";

  let data = req.body.OrderID;

  await conn.query(sql, data, function (err, rows) {
    let isDone = "notDone";
    if (err) {
      res.send(err);
    } else {
      isDone = "Done";
      // res.send(isDone);
      console.log(rows, "here");
      res.send({ isDone, data: rows });
    }
  });
});
// ====================

app.listen(2407, function () {
  console.log("機器人：伺服器啟動中" + new Date().toLocaleTimeString());
});
