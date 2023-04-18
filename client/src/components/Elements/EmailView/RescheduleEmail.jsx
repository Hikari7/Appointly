import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';


const RescheduleEmail = ({ host, guest, mtgInfo }) => {
  return (
    <Html>
    <Head />
    <Preview>
      Your meetin is rescheduled!
    </Preview>
      <Container style={container}>
        <Text style={paragraph}>Hi {guest.name},</Text>
        <Text style={paragraph}>
          Your meeting was rescheduled by the host, {host.name}. Please check the details below.
        </Text>
        <Text style={paragraph}>Updated meeting information</Text>
        <Text style={paragraph}>Event Type:</Text>
        <Text style={paragraph}>30 Minute Meeting</Text>
        <Text style={paragraph}>Host:</Text>
        <Text style={paragraph}>{host.name}</Text>
        <Text style={paragraph}>Event Date/Time:</Text>
        <Text style={paragraph}>{mtgInfo.date}, {mtgInfo.time}</Text>
        <Text style={paragraph}>(Pacific Time - US & Canada)</Text>
        <Text style={paragraph}>
          Best wishes,
          <br />
          Appointly
        </Text>
      </Container>
  </Html>
  )
}

export default RescheduleEmail

// Styles

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};
