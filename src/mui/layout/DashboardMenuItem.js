import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import { Link } from 'react-router';
import translate from '../../i18n/translate';

const DashboardMenuItem = ({ onTouchTap, translate }) => (
    <MenuItem
        containerElement={<Link to="/" />}
        primaryText={translate('aor.page.dashboard')}
        leftIcon={<DashboardIcon />}
        onTouchTap={onTouchTap}
    />
);

DashboardMenuItem.propTypes = {
    onTouchTap: PropTypes.func,
    translate: PropTypes.func.isRequired,
};

export default translate(DashboardMenuItem);
