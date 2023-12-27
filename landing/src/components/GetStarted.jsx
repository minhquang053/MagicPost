import React from 'react'
import { 
    Box,
    Grid,
    styled,
    Typography,
} from '@mui/material'
import Title from './Title'
// img
import imgDetail from '../assets/pexels-alex-staudinger-1732414.jpg';
import imgDetail2 from '../assets/pexels-pixabay-271816.jpg';


const GetStarted = () => {

    const CustomGridItem = styled(Grid) ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    })
    
    const CustomTypography = styled(Typography) ({
        fontSize: '1.1rem',
        textAlign: 'start',
        lineHeight: '1.5',
        color: '#515151',
        marginTop: '1.5rem',
    })

    return (
            
        <Grid container spacing={{ xs: 4, sm: 4, md: 0 }}   
        sx={{
            py: 10,
            px: 2,
             
        }}
        >
            <CustomGridItem item xs={12} sm={8} md={6} 
            component = 'section'
           
            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'Về chúng tôi'
                    }
                    textAlign={'start'}
                    />
                    <CustomTypography >
                    <span>MagicPost là thương hiệu chuyển phát nhanh<br />
                    dựa trên sự phát triển của công nghệ và Internet.<br />
                    Chúng tôi sở hữu một mạng lưới rộng khắp<br />
                    để hỗ trợ các hoạt động giao hàng nhanh không chỉ<br />
                    ở nội thành mà còn ở ngoại ô và vùng sâu vùng xa <br />
                    của các tỉnh trên toàn Việt Nam.    
                    </span>
                    </CustomTypography> 
                </Box>

            </CustomGridItem>
            
            <Grid item xs={12} sm={4} md={6}>
                <img src={imgDetail} alt="" 
                style={{
                    width: '100%',
                }}
                />
            </Grid>

            <Grid item xs={12} sm={4} md={6}
            sx={{
                order: {xs: 4, sm: 4, md: 3}
            }}
            >
                <img src={imgDetail2} alt="" 
                style={{ 
                    width: "100%",
                }}
                />
            </Grid>

            <CustomGridItem item xs={12} sm={8} md={6}
            sx={{
                order: {xs: 3, sm: 3, md: 4}
            }}
            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'Giá trị cốt lõi'
                        
                    }
                    textAlign={'start'}
                    />
                    <CustomTypography>
                    Bổn phận, Chia sẻ, Trách nhiệm là ba giá trị cơ bản của J&T Express nhằm mang đến chất lượng dịch vụ giao hàng tốt nhất cho khách hàng.<br /> 
                    Chúng tôi cam kết phục vụ một cách trung thực và có trách nhiệm đối với từng đơn hàng của khách hàng.
                    </CustomTypography>
                </Box>
            </CustomGridItem>
        </Grid>
    )
}

export default GetStarted;