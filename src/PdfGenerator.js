import React, {Component} from 'react';
import jsPDF from 'jspdf'
import Button from 'react-bootstrap/Button';
import labels from './images/labels/labels.json'
import pictograms from './images/labels/picotrgram.json' //base64 encoded https://www.base64-image.de/


class PdfGenerator extends Component {

    constructor(props){
        super(props)
        this.state = {

        }

    }

    // jspdf generator fucntion

    jsPdfGenerator = () => {
        var options = {
            orientation: 'l',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts:true
           }
           
           // creating the document
           var doc = new jsPDF(options);

           // adiing some text
           doc.addImage(labels[1], 'JPEG', 0,0, 297,210)


           //OMoD
           doc.setFont('arial')
           doc.setFontType("bold")
           doc.setFontSize(16)
           doc.text(110,41," 16 05 06")
           
           doc.setFontSize(10)
           doc.setFontType("normal")
           // Remettant
           doc.text(90,10.5,"ISIC-CH/PH-1015 Lausanne")

           // Group
           doc.text(6,50, "this is my amazing group",{maxWidth: 15})

           // Name
           doc.text(6,75, "Jeremy Mion",{maxWidth: 15})

           // date
           var date = new Date()
           doc.text(6,103,date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())

           //other comments
           doc.setFontSize(10)
           doc.setFontType('normal')
           doc.text(30,64, "This is some details about the content of the label. Carfull and a lor more input could maybe overflo the line ", {maxWidth:110})

           doc.addImage(pictograms["health_hazard"], "PNG", 10, 15, 10, 10)
           doc.addImage(pictograms["skull"], "PNG", 22, 15, 10, 10)
           doc.addImage(pictograms["skull"], "PNG", 34, 15, 10, 10)
           doc.addImage(pictograms["skull"], "PNG", 46, 15, 10, 10)

           doc.addImage(pictograms["skull"], "PNG", 16, 21, 10, 10)
           doc.addImage(pictograms["skull"], "PNG", 28, 21, 10, 10)
           doc.addImage(pictograms["skull"], "PNG", 40, 21, 10, 10)


           doc.save("label.pdf")
           
    }


    render() { 
        return ( 
            <Button variant="primary" type="submit" onClick={this.jsPdfGenerator}>
            Generate PDF
            </Button> 
          );
    }
}
 
export default PdfGenerator;