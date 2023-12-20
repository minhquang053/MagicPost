import { useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Collapse, List, ListItem } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title, subItems, allowedRoles } = props;

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank',
      }
      : {
        component: NextLink,
        href: path,
      }
    : {};
  
  const { user } = useAuth();

  const filteredSubItems = subItems?.filter(subItem => {
    if (!subItem.allowedRoles || subItem.allowedRoles.length === 0) {
      // Sub-item accessible to all roles
      return true;
    }
    return subItem.allowedRoles.includes(user?.role);
  });

  return (
    <li>
      <div>
        <ButtonBase
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            },
          }}
          onClick={subItems ? handleToggle : undefined}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main',
                }),
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white',
              }),
              ...(disabled && {
                color: 'neutral.500',
              }),
            }}
          >
            {title}
          </Box>
        </ButtonBase>

        {/* Nested Dropdown Menu */}
        {subItems && (
          <Collapse in={open}>
            <List component="div" disablePadding>
              {filteredSubItems.map((subItem, index) => (
                <ListItem key={index}>
                  <SideNavItem {...subItem} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  subItems: PropTypes.arrayOf(PropTypes.object),
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};
