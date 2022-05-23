// @mui

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';
import Modal from '../../../utils/modal/editmodal'


// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummaryEdit.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
  edit:PropTypes.string
};

export default function AppWidgetSummaryEdit({ title,refreshPage,refresh,livemarket,livemarketdata,jupitrate, total, icon, edit,userid, color = 'primary', sx, ...other }) {

    const [openmodal,setOpenModal] = useState(false);
    const [completed,setcompleted] = useState(false)
    
    const handleClick = ()=>{
        setOpenModal(true);
    }
    useEffect(()=>{
    
        refreshPage(!refresh)
    },[completed])

  return (
      <>
      
    {openmodal &&<Modal statemodal={openmodal} modifyOpen={setOpenModal} modalTitle={title} userid={userid} marketrate={livemarketdata} jupitrate={jupitrate} page={setcompleted}/>}
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
    <Typography variant="h6">{livemarket}</Typography>
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h4">{title === 'Naira Wallet Balance' ? fShortenNumber(total) : total}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
      <Iconify icon={edit} width={24} height={24}  onClick={()=>handleClick()}/>
    </Card>
    </>
  );
}
