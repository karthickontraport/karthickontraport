import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../actions/mailAction";
import { Container, Box } from "../Layout";
import { LeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip, Input, message } from "antd";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import styles from "../MailModelBox/MailModelBox.module.css";
import style from "./ActionsModel.module.css";

const MailAction = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.mail);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
    cc: "",
    bcc: "",
  });

  const handleSendMail = () => {
    if (
      !emailData.to.trim() ||
      !emailData.subject.trim() ||
      !emailData.body.trim()
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    dispatch(mailAction(emailData));
  };

  useEffect(() => {
    if (success) {
      setEmailData({
        to: "",
        subject: "",
        body: "",
        cc: "",
        bcc: "",
      });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleEditorChange = (value) => {
    setEmailData({ ...emailData, body: value });
  };

  return (
    <Container className={style.Container}>
      <Box className={style.Header}>
        <Container alignBox="row" align="vertical">
          <Box onClick={onClose} className={style.backIcon}>
            <Tooltip title="Back">
              <Container align="both">
                <LeftOutlined />
              </Container>
            </Tooltip>
          </Box>
          <Box flexible className={style.text}>
            Sent an Mail to Selected Contacts
          </Box>
          <Box>
            <Flex gap="small" wrap="wrap">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={handleSendMail} loading={loading}>
                {loading ? "Sending mail" : "Sent mail"}
              </Button>
              <Button type="primary">Sent Later</Button>
            </Flex>
          </Box>
        </Container>
      </Box>
      <Box flexible className={style.children}>
        <Container className={styles.Container}>
          <Box className={styles.title}>Quick Email</Box>
          <Box>
            <Container style={{ gap: "1rem" }}>
              <Box>
                <Container>
                  <Box>
                    <Container alignBox="row" align="vertical">
                      <Box className={styles.label}>Sent Email To</Box>
                      <Input
                        placeholder="Sent Email..."
                        allowClear
                        value={emailData.to}
                        onChange={(e) =>
                          setEmailData({ ...emailData, to: e.target.value })
                        }
                      />
                    </Container>
                  </Box>
                </Container>
              </Box>
              <Box>
                <Container>
                  <Box>
                    <Container alignBox="row" align="vertical">
                      <Box className={styles.label}>CC</Box>
                      <Input
                        placeholder="CC..."
                        allowClear
                        value={emailData.cc}
                        onChange={(e) =>
                          setEmailData({ ...emailData, cc: e.target.value })
                        }
                      />
                    </Container>
                  </Box>
                </Container>
              </Box>
              <Box>
                <Container>
                  <Box>
                    <Container alignBox="row" align="vertical">
                      <Box className={styles.label}>BCC</Box>
                      <Input
                        placeholder="BCC..."
                        allowClear
                        value={emailData.bcc}
                        onChange={(e) =>
                          setEmailData({ ...emailData, bcc: e.target.value })
                        }
                      />
                    </Container>
                  </Box>
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            <Container>
              <Box>
                <Container alignBox="row" align="vertical">
                  <Box className={styles.label}>Email Subject</Box>
                  <Input
                    placeholder="Subject..."
                    allowClear
                    value={emailData.subject}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                  />
                </Container>
              </Box>
            </Container>
          </Box>
          <Box>
            Details
            <i style={{ color: "#4096ff", marginLeft: "5px" }}>
              <QuestionCircleOutlined />
            </i>
          </Box>

          <Box flexible>
            <RichTextEditor
              editorHeight="200px"
              onChange={handleEditorChange}
              initialValue={emailData.body}
            />
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

MailAction.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MailAction;
