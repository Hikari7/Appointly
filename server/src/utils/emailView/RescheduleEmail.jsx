const Html = require('@react-email/html')
const Head = require('@react-email/head')
const Preview = require('@react-email/preview')
const Container = require('@react-email/container')
const Text = require('@react-email/text')
const { h } = require('preact')

exports.RescheduleEmail = ({host, mtgInfo}) => {
  return (
    <Html lang="en">
    <Head />
    <Preview>
      Your meetin is rescheduled!
    </Preview>
      <Container style={container}>
        <Text style={paragraph}>Hi {mtgInfo.name},</Text>
        <Text style={paragraph}>
          Your meeting was rescheduled by the host, {host.username}. Please check the details below.
        </Text>
        <Text style={paragraph}>Updated meeting information</Text>
        <Text style={paragraph}>Event Type:</Text>
        <Text style={paragraph}>30 Minute Meeting</Text>
        <Text style={paragraph}>Host:</Text>
        <Text style={paragraph}>{host.username}</Text>
        <Text style={paragraph}>Event Date/Time:</Text>
        <Text style={paragraph}>{mtgInfo.appointmentDateTime.date}, {mtgInfo.appointmentDateTime.time}</Text>
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

// module.exports = RescheduleEmail

// Styles

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};
