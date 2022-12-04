/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography, List, ListItem, Card, Box, CardContent } from '@mui/material';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import logo from '../logo.svg';

import { AppContext } from '../../contexts';
import { APP_TITLE, PAGE_TITLE_SHIFTS } from '../../utils/constants';
import styled from '@emotion/styled';

import { columnsFromBackend } from './shiftsData';
import TaskCard from './TaskCard';

const Container = styled.div`
	display: flex;
`;

const TaskList = styled.div`
	min-height: 100px;
	display: flex;
	flex-direction: column;
	background: #f3f3f3;
	min-width: 341px;
	border-radius: 5px;
	padding: 15px 15px;
	margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
	margin: 8px;
	display: flex;
	width: 100%;
	min-height: 80vh;
`;

const Title = styled.span`
	color: #10957d;
	background: rgba(16, 149, 125, 0.15);
	padding: 2px 10px;
	border-radius: 5px;
	align-self: flex-start;
`;

export const Shifts = () => {
	// const context = useContext(AppContext);

	const [columns, setColumns] = useState(columnsFromBackend);

	const onDragEnd = (result: DropResult, columns: Record<string, any>, setColumns: Function) => {
		if (!result.destination) return;
		const { source, destination } = result;
		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems
				}
			});
		} else {
			const column = columns[source.droppableId];
			const copiedItems = [...column.items];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems
				}
			});
		}
	};
	return (
		<>
			<Helmet>
				<title>
					{PAGE_TITLE_SHIFTS} | {APP_TITLE}
				</title>
			</Helmet>
			{/* <Typography variant='h4'>משמרות</Typography> */}
			<div
				css={css`
					text-align: center;
					// margin-top: 6rem;
				`}
			>
				<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
					<Container>
						<TaskColumnStyles>
							{Object.entries(columns).map(([columnId, column], index) => {
								return (
									<Droppable key={columnId} droppableId={columnId}>
										{(provided, snapshot) => (
											<TaskList ref={provided.innerRef} {...provided.droppableProps}>
												<Title>{column.title}</Title>
												{column.items.map((item, index) => (
													<TaskCard key={item.id} item={item} index={index} />
												))}
												{provided.placeholder}
											</TaskList>
										)}
									</Droppable>
								);
							})}
						</TaskColumnStyles>
					</Container>
				</DragDropContext>
			</div>
		</>
	);
};
