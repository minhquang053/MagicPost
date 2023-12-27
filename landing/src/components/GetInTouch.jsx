import React from 'react'
import {  
    Button,
    Stack,
} from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'
import { Link } from 'react-router-dom'

const GetInTouch = () => {

    return (
        <Stack 
        component='section'
        direction="column"
        justifyContent= 'center'
        alignItems='center'
        sx={{
            py: 10,
            mx: 6,
        }}
        >
            <Title 
            text={
                'Liên hệ ngay để nhận tư vấn'
                } 
            textAlign={'center'}
            />
            <Paragraph 
            text={
                'Cam kết của chúng tôi là đảm bảo trải nghiệm vận chuyển chuyên nghiệp và bảo mật cho bạn. Nếu bạn có bất kỳ thắc mắc nào, hãy nhấp vào nút bên dưới để được giải đáp.'
            }
            maxWidth = {'sm'}
            mx={0}
            textAlign={'center'}
            />
            <Button component={Link} 
            to={'/contact'}
            variant="contained" 
            type="submit"
            size="medium"
            sx= {{ 
                fontSize: '0.9rem',
                textTransform: 'capitalize', 
                py: 2,
                px: 4,
                mt: 3, 
                mb: 2,
                borderRadius: 0,
                backgroundColor: '#14192d',
                "&:hover": {
                    backgroundColor: '#1e2a5a',
                }
            }}
            >
                Bạn cần hỗ trợ ?
            </Button>
 
        </Stack>
    )
}

export default GetInTouch;