import { format } from 'date-fns'
import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {
    const dispatch = useDispatch();
    const handleEditNote = () => {
        dispatch(
            activeNote(id, {
                date,title,body,url
            }
            )
         )
    }
    

    return (
        <div 
            className="journal__entry"
            onClick={handleEditNote}
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`,
                    }}
                >
            </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{format(date, 'EEEE')}</span>
                <h4>{format(date, 'do')}</h4>
            </div>
        </div>
        
    )
}
