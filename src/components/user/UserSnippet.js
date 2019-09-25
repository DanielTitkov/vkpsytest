import React from 'react';
import { Group, ListItem, Avatar } from '@vkontakte/vkui';


export default function UserSnippet(props) {
    const { currentUser } = props;
    return (
        <div>
            {currentUser &&
			<Group>
				<ListItem
					before={currentUser.photo_200 ? <Avatar src={currentUser.photo_200}/> : null}
					description={currentUser.city && currentUser.city.title ? currentUser.city.title : ''}
				>
					{`${currentUser.first_name} ${currentUser.last_name}`}
				</ListItem>
			</Group>}
        </div>
    )
}
