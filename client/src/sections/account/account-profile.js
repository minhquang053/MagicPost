// AccountProfile.js
import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { AvatarSelectionDialog } from './avatar-selection-dialog'; // Adjust the path as needed
import { useAuth } from 'src/hooks/use-auth';

export const AccountProfile = () => {
  const { user } = useAuth();
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  const handleOpenAvatarDialog = () => {
    setAvatarDialogOpen(true);
  };

  const handleCloseAvatarDialog = () => {
    setAvatarDialogOpen(false);
  };

  const handleSelectAvatar = async (selectedAvatar) => {
    const profile = {
      'avatar': selectedAvatar
    }
    const response = await fetch(
      `http://localhost:3030/v1/users/${user.id || user.userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
          'user': profile,
        })
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to update user avatar");
    }
    handleCloseAvatarDialog();
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user?.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography gutterBottom variant="h5">
            {user?.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" onClick={handleOpenAvatarDialog}>
          Chọn avatar
        </Button>
      </CardActions>

      {/* Avatar Selection Dialog */}
      <AvatarSelectionDialog
        open={avatarDialogOpen}
        onClose={handleCloseAvatarDialog}
        onSelectAvatar={handleSelectAvatar}
      />
    </Card>
  );
};