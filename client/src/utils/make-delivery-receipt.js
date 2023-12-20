import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export function makeDeliveryReceipt(order) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const senderInfo = order.senderInfo;
    const recipientInfo = order.recipientInfo;
    const goodsType = order.goodsType;
    const weightInfo = order.weightInfo;
    const costInfo = order.costInfo;
    const recipientFees = order.recipientFees;

    const documentDefinition = {
        pageOrientation: 'lanscape',
        content: [
	    {
			table: {
			    widths: ['*', '*'],
				body: [
					[
					    {
					        text: `Họ tên địa chỉ người gửi:
                                ${senderInfo.fullName}
                                ${senderInfo.address} - ${senderInfo.ward} - ${senderInfo.district} - ${senderInfo.province}\n
                                Điện thoại: ${senderInfo.phoneNumber}`
                            ,
					    },
					    {
					        text: `Họ tên địa chỉ người nhận:
                                ${recipientInfo.fullName}
                                ${recipientInfo.address} - ${recipientInfo.ward} - ${recipientInfo.district} - ${recipientInfo.province}\n
                                Điện thoại: ${recipientInfo.phoneNumber}`
                            ,
					    },
					],
                    [
                        {
					        text: `Loại hàng gửi:
                            ${goodsType === 'document'?"Tài liệu":"Hàng hóa"}`,
					    },
                        {
                            text: `Khối lượng (kg):
                            Khối lượng thực tế: ${weightInfo.real}
                            Khối lượng quy đổi: ${weightInfo.exchanged}`
                        }
                    ],
                    [
                        {
					        text: `Cước:
                            Cước chính: ${costInfo.main}
                            Phụ phí: ${costInfo.additional}
                            Cước GTGT: ${costInfo.gtgt}
                            Tổng cước (gồm VAT): ${costInfo.vat}
                            Thu khác: 0
                            Tổng thu: ${costInfo.main + costInfo.additional + costInfo.gtgt}`
					    },
                        {
                            text: `Thu của người nhận:
                            COD: ${recipientFees.cod}
                            Thu khác: ${recipientFees.additional}
                            Tổng thu: ${recipientFees.cod + recipientFees.additional}`
                        }
                    ],
                    [
                        {
					        text: `Cam kết của người gửi:
                            Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được tôi sẽ trả cước chuyển khoản
                            Ngày giờ gửi:
                            ${order.createdDate}
                            Chữ ký của người gửi:
                            
                            
                            `
					    },
                        {
                            text: `Ngày giờ nhận:
                            ...h...../....../....../20......
                            Người nhận/Người được ủy quyển nhận
                            (Ký, ghi rõ họ tên)
                            
                            
                            `
                        }
                    ]
				]
			}
		},
	]
    }

    pdfMake.createPdf(documentDefinition).open();
}