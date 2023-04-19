import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Preview } from "@react-email/preview";
import { Container } from "@react-email/container";
import { Text } from "@react-email/text";
import { Body } from "@react-email/body";
import { Hr } from "@react-email/hr";

const CancelationEmail = ({ host, guest, mtgInfo }) => {
  return (
    <Html>
      <Head />
      <Preview>Your meeting is rescheduled</Preview>
      <Body style={main}>
        <Container style={box} />
        <Hr style={hr} />

        <Container style={container}>
          <Text style={h1}>Canceled meeting</Text>
          <Text style={h2}>
            @{mtgInfo.date} {mtgInfo.time} (PDT)
          </Text>

          <Text style={paragraph}>Hi {guest.name},</Text>
          <Text style={paragraph}>
            This meeting has been canceled by {host.name}.
            <br />
            Here's the updated meeting information.
          </Text>
          <Text style={info}>
            <Text style={paragraph}>Host: {host.name}</Text>
            <Text style={paragraph}>Host's email: {host.email}</Text>
            <Text style={paragraph}>
              Event Date/Time: {mtgInfo.time} (Pacific Time - US & Canada)
            </Text>
          </Text>
          <Text style={paragraph}>Contact your host for more info.</Text>
          <Text style={paragraph}>
            Best wishes,
            <br />
            Appointly
          </Text>
          <Hr style={hr} />
          <Container style={box} />
        </Container>
      </Body>
    </Html>
  );
};

export default CancelationEmail;

// Styles

const main = {
  textAlign: "center",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const box = {
  margin: "8px 0",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const paragraph = {
  fontSize: "16px",
};

const h1 = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const h2 = {
  fontSize: "18px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const hr = {
  borderColor: "#95B9F4",
  margin: "20px 0",
};

const info = {
  padding: "24px",
  margin: "12px 64px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};
