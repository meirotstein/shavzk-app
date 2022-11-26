/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

import logo from '../logo.svg';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME, PAGE_TITLE_SHIFTS } from '../utils/constants';

export const Shifts = () => {
	const context = useContext(AppContext);

	return (
		<>
			<Helmet>
				<title>
					{PAGE_TITLE_SHIFTS} | {APP_TITLE}
				</title>
			</Helmet>
			<Typography variant='h4'>משמרות</Typography>
			<div
				css={css`
					text-align: center;
					margin-top: 6rem;
				`}
			>
				
			</div>
		</>
	);
};
