// AvatarSelectionDialog.js
import React, { useState } from 'react';
import { Dialog, DialogContent, List, ListItem, ListItemAvatar, Avatar, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  avatarList: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    // Make sure there's no excessive padding or margin that causes overflow
  },
  avatarButton: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '40%',
    margin: theme.spacing(0, 1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    width: '100%',
    position: 'relative',
  },
  indicator: {
    height: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'width 0.3s ease-in-out',
  },
  navigationButtons: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
  },
  navigationButton: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '50%',
    margin: theme.spacing(0, 1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end',
  },
}));

export const AvatarSelectionDialog = ({ open, onClose, onSelectAvatar }) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);

  const avatars = [
    '/assets/avatars/avatar-alcides-antonio.png',
    '/assets/avatars/avatar-anika-visser.png',
    '/assets/avatars/avatar-cao-yu.png',
    '/assets/avatars/avatar-carson-darrin.png',
    '/assets/avatars/avatar-chinasa-neo.png',
    '/assets/avatars/avatar-fran-perez.png',
    '/assets/avatars/avatar-iulia-albu.png',
    '/assets/avatars/avatar-jane-rotanson.png',
    '/assets/avatars/avatar-jie-yan-song.png',
    '/assets/avatars/avatar-marcus-finn.png',
    '/assets/avatars/avatar-miron-vitold.png',
    '/assets/avatars/avatar-nasimiyu-danai.png',
    '/assets/avatars/avatar-neha-punita.png',
    '/assets/avatars/avatar-omar-darboe.png',
    '/assets/avatars/avatar-penjani-inyene.png',
    '/assets/avatars/avatar-seo-hyeon-ji.png',
    '/assets/avatars/avatar-siegbert-gottfried.png',
  ];

  const totalPages = Math.ceil(avatars.length / 4);
  const indicatorWidth = `${(100 / totalPages) * (currentPage + 1)}%`;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent className={classes.dialogContainer}>
        <div className={classes.avatarList}>
          <Button onClick={handlePrevPage} className={classes.navigationButton}>
            {'<'}
          </Button>
          {avatars.slice(currentPage * 4, (currentPage + 1) * 4).map((avatar, index) => (
            <ListItem key={index} disableGutters>
              <ListItemAvatar>
                <Button className={classes.avatarButton} onClick={() => onSelectAvatar(avatar)}>
                  <Avatar src={avatar} />
                </Button>
              </ListItemAvatar>
            </ListItem>
          ))}
          <Button onClick={handleNextPage} className={classes.navigationButton}>
            {'>'}
          </Button>
        </div>
        <div className={classes.indicatorContainer}>
          <div className={classes.indicator} style={{ width: indicatorWidth }} />
        </div>
        <div className={`${classes.cancelButton} ${classes.navigationButton}`}>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};