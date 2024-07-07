import { Typography, Box, Link } from "@mui/joy";
import Icon from "@/components/Icon";
import MobileHeader from "@/components/MobileHeader";

const About = () => {
  return (
    <section className="@container w-full max-w-5xl min-h-full flex flex-col justify-start items-center sm:pt-3 md:pt-6 pb-8">
      <MobileHeader />
      <div className="w-full px-4 sm:px-6">
        <Box 
          sx={{
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            borderRadius: 'xl',
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              boxShadow: 6,
              transition: 'box-shadow .3s ease-in-out',
            },
            '@media (prefers-color-scheme: dark)': {
              backgroundColor: 'zinc.800',
              color: 'gray.300',
            }
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            <Icon icon="bulletin-board" /> Welcome to the Linkin Love Bulletin Board!
          </Typography>
          <Typography variant="body1" align="center">
            Here, you'll find regular updates on our development progress. We encourage everyone to join the conversation and share your thoughts!
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center">
            Powered by memos
          </Typography>
        </Box>
      </div>
    </section>
  );
};

export default About;
