// @mui

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { reactLocalStorage } from 'reactjs-localstorage';
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

export default function AppWidgetSummaryEdit({ title,refreshPage,refresh,livemarket,livemarketdata,jupitrate, total, icon, edit, withdrawal,userid, color = 'primary', sx, ...other }) {
console.log('livemarket',livemarket)
console.log('livemarketdata',livemarketdata)
  const [openmodal,setOpenModal] = useState(false);
  const [completed,setcompleted] = useState(null);
  const [mode,setmode] = useState()
  
  const handleClick = (mode)=>{
    setmode(mode);
    setOpenModal(true);
  }
  const x = reactLocalStorage.getObject('admin').previledge;
  const breaker =(total)=>{
          return total ? total.toLocaleString('en-US'):'0'
   }

   const _renderDeposit = ()=>{
      return x.map(d=>{
        if(d.includes('Manual Deposit') || d.includes('All')){
          return  <>
                    <Iconify icon={edit} width={29} height={29}  onClick={()=>handleClick('Deposit')}/> 
                  </>
        }
        return null
        
        
      })
  }

  const _renderWithdrawal = ()=>{
    return x.map(d=>{
      if(d.includes('Manual Withdrawal') || d.includes('All')){
        return  <>
                  <Iconify icon={withdrawal} width={24} height={24}  onClick={()=>handleClick('Withdrawal')}/>  
                </>
      }
      return null
      
      
    })
}

  return (
      <>
      
    {openmodal &&<Modal statemodal={openmodal} modifyOpen={setOpenModal} modalTitle={title} userid={userid} marketrate={livemarketdata} jupitrate={jupitrate} page={refreshPage} pagerefresh={refresh} mode={mode} balance={total}/>}
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
    <Typography >{livemarketdata && `$ ${livemarketdata.toLocaleString('en-US')}`}</Typography>
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

      <Typography variant="h4">{title === 'Naira Wallet Balancexx' ? fShortenNumber(total) : breaker(total)}</Typography>
      <Typography >{livemarket && `USD: ${livemarket.toLocaleString('en-US')}`}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
        {_renderDeposit()}
        {_renderWithdrawal()}
       
    </Card>
    </>
  );
}
