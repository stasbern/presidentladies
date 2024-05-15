import '../app/globals.css'

interface Comment {
    id: string;
    discord_username: string;
    content: string;
    created_at: string;
    bg_color: any;
}
export const Comment: React.FC<Comment> = ({ id, discord_username, content, created_at, bg_color }) => {
    return (
        <div key={id} style={{ borderColor: bg_color, wordWrap: 'break-word' }} className='backdrop-hue-rotate-90 backdrop-blur-sm border-2 p-2 text-white'>
            <p className='text-xs'>{discord_username}</p>
            <div style={{ wordWrap: 'break-word' }} className='py-2'>{content}</div>
            <p className='text-xs'>{new Date(created_at).toLocaleString()}</p>
        </div>);
};