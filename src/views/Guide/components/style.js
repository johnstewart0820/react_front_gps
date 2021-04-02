import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {    
    padding: theme.spacing(3),		
		color: theme.palette.text.primary,		
  },
	img: {
		width: '100%'
	},
}));

export default useStyles;
