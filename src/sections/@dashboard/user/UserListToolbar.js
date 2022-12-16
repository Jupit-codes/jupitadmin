import PropTypes from 'prop-types';
// material
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName,selected,refresh,setRefresh,setSelected }) {
  const deleteSelected = async()=>{
    const BaseUrl = process.env.REACT_APP_ADMIN_URL
    if(selected.length > 0){
        
      await axios({
        url:`${BaseUrl}/admin/delete/selected/roles`,
        method:"POST",
        headers:{
          "Content-type":'application/json',
          "Authorization":reactLocalStorage.get('token')
        },
        data:JSON.stringify({_ids:selected})

      })
      .then((res)=>{
      
        if(res.data.status){
          setRefresh(!refresh)
          setSelected([]);
          Swal.fire({
            title: 'Message!',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'ok'
          });
          
          
        }

      })
      .catch((err)=>{
        console.log("errorx",err.response);
      })
    
    }
    
  }

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={()=>{deleteSelected()}}>
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
