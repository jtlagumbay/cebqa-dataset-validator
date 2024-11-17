// BlogPost.js
import React from 'react';
import { useParams } from 'react-router-dom';
import TextCompare from './TextCompare';
import QuestionAnswer from './QuestionAnswer';
import Accordion from 'react-bootstrap/Accordion';

export default function Article (){
    const { id } = useParams(); // Extract the 'id' parameter from the route
    const dataset = {
        "data": [
          {
            "title": "Abando midangop sa SC",
            "context": "Ang gitaktak nga mayor, Brody Abando, nangayo og interbensyon sa Supreme Court (SC) aron babagan ang Commission on Elections (Comelec) sa pagpatuman sa dismissal order sa Office of the Ombudsman batok kaniya.",
            "question": "Kinsa ang gitaktak nga mayor nga nangayo og interbensyon sa SC?",
            "answer": "Brody Abando."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Si Abando nisang-at og petisyon alang sa Certiorari, Prohibition, and Injunction atubangan sa SC niadtong Miyerkules, Oktubre 9, 2024.",
            "question": "Kanus-a nisang-at si Abando og petisyon sa SC?",
            "answer": "Oktubre 9, 2024."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Ang Ombudsman, sa desisyon nga pinetsahan og Septiyembre 26, nitaktak kang Abando sa serbisyo human siya napamatud-ang sad-an sa grave misconduct tungod sa pagtugot sa padayong operasyon sa usa ka cement batching plant nga way gikinahanglang business ug environmental permits.",
            "question": "Sa unsang petsa gipahibalo ang desisyon nga nagtak-tak kang Abando sa serbisyo?",
            "answer": "Septiyembre 26."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Ang legal nga lakang ni Abando susama sa gihimo sa dismissal nga mayor nga si Cedie Abangan nga niduso usab og petisyon sa SC aron hunongon ang iyang pagkataktak ug pagkadiskwalipikasyon sa serbisyo niadtong Oktubre 7.",
            "question": "Kinsa ang mayor nga gihisgutan nga susama sa legal nga lakang ni Abando?",
            "answer": "Cedie Abangan."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "“The disqualification penalty is not like dismissal. If the decision is reversed, the mayor could receive back wages for the time lost.",
            "question": "Unsay kalainan sa disqualification penalty ug dismissal sumala ni Abangad?",
            "answer": "Ang disqualification penalty dili sama sa dismissal."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Si City Administrator Jamaal Adrian Abangad nitug-an sa mga tigbalita niadtong Miyerkules nga si Abando nangayo og legal recourse susama sa kang Abangan.",
            "question": "Kinsa ang City Administrator nga nitug-an sa mga tigbalita bahin sa legal recourse ni Abando?",
            "answer": "Jamaal Adrian Abangad."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Ang pagkanselar sa iyang COC makapugong sa pagbotar ni Abando sa 2025 elections, usa ka lakang nga gihulagway ni Abangad nga usa ka “irreparable” injury sa mayor ug sa katawhan sa Mandaue City.",
            "question": "Unsay epekto sa pagkanselar sa COC ni Abando sa 2025 elections?",
            "answer": "Makapugong sa pagbotar ni Abando."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Ang legal team ni Abando nangayo og Temporary Restraining Order (TRO) o Writ of Preliminary Injunction gikan sa SC aron mapugngan ang Comelec sa pagpatuman sa resolusyon sa dili pa ang pag-imprinta sa mga balota nga gikatakdang sugdan karong Nobiyembre 15.",
            "question": "Unsa ang gipangayo sa legal team ni Abando gikan sa SC?",
            "answer": "Temporary Restraining Order (TRO) o Writ of Preliminary Injunction."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Si Abando niingon nga ang maong resolusyon nagdaot sa katungod sa katawhan sa pagpili sa ilang mga lider sa usa ka demokratikong piniliay nga maoy labing importante.",
            "question": "Unsay giingon ni Abando bahin sa epekto sa resolusyon sa katungod sa katawhan?",
            "answer": "Nagdaot sa katungod sa katawhan sa pagpili."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Si Abando nagsilbi usab sa iyang usa ka tuig nga pagkasuspenso nga walay bayad nga gipahamtang kaniya sa Ombudsman sukad niadtong Agusto 12.",
            "question": "Kanus-a nagsugod ang pagkasuspenso ni Abando nga walay bayad?",
            "answer": "Agusto 12."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Gisuspenso sa Ombudsman si Abando tungod sa grave misconduct ug conduct prejudicial to the best interest of the service tungod sa pagtudlo kang Abanto Abao isip officer-in-charge sa City Social Welfare Services Office niadtong 2022.",
            "question": "Unsang rason nganong gisuspenso si Abando?",
            "answer": "Grave misconduct ug conduct prejudicial to the best interest of the service."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Si Abanado migamit sa iyang hulagway ug giingon nga dili siya natugotan sa Comelec nga molihok sa panahon sa iyang pagkataktak.",
            "question": "Unsay giingon nga aksyon nga nakapugong kang Abando nga molihok?",
            "answer": "Dili siya natugotan sa Comelec nga molihok."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Nikuwestiyon si Abando niadtong Martes sa resolusyon sa Comelec kinsa nangatarongan nga nakalapas kini sa due process nga gigarantiya ubos sa 1987 Constitution.",
            "question": "Unsang aspeto sa Comelec ang gikwestiyon ni Abando?",
            "answer": "Due process nga gigarantiya ubos sa 1987 Constitution."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Ang desisyon batok kaniya dili pa pinal, ug samtang ilang gitahod ang hukom sa Ombudsman, ilang gihagit ang dihadiha nga executory nga kinaiya sa desisyon ilabi na ang paglakip niini sa disqualification penalty.",
            "question": "Unsa ang giingon bahin sa desisyon batok kaniya?",
            "answer": "Dili pa pinal."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Ang resolusyon naglakip sa mga probisyon alang sa dinaliang pagkansela sa COC alang sa mga kandidato nga gisilotan og disqualification sa Ombudsman bisan pa kon ang desisyon nakaabot na sa finality.",
            "question": "Unsa ang gihatag nga probisyon sa resolusyon alang sa COC?",
            "answer": "Dinaliang pagkansela sa COC."
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Matod ni Abangad, “Now sa kani nga resolution asa naman ang hustisya ani? Is it just? Is it fair?",
            "question": "Unsay pangutana nga gipangutana ni Abando bahin sa resolusyon?",
            "answer": "Asa naman ang hustisya ani?"
          },
          {
            "title": "Abando midangop sa SC",
            "context": "Matod pa ni Abangad, “But once disqualified, there’s no turning back, his name will be removed from the ballots, and the people’s choice in the election will be disregarded.”",
            "question": "Unsa ang mahitabo kung ma-disqualify si Abando?",
            "answer": "Walay turning back, tangtangon ang iyang ngalan sa balota."
          }
        ]
      }

    const article = {
        "id": 8,
        "url": "https://www.sunstar.com.ph/superbalita-cebu/cortes-midangop-sa-sc",
        "title": "Cortes midangop sa SC",
        "author": "Cherry Ann Virador",
        "date": "Oct 09, 2024",
        "body": "Ang gitaktak nga mayor, Jonas Cortes, nangayo og interbensyon sa Supreme Court (SC) aron babagan ang Commission on Elections (Comelec) sa pagpatuman sa dismissal order sa Office of the Ombudsman batok kaniya. Si Cortes nisang-at og petisyon alang sa Certiorari, Prohibition, and Injunction atubangan sa SC niadtong Miyerkules, Oktubre 9, 2024, nga naghagit sa Comelec Resolution No. 1104-A, nga nagmando sa hinanaling pagkansela sa mga certificates of candidacy (COCs) sa mga kandidato nga nag-atubang og administratibo nga mga kaso bisan sa wala pa mahimong pinal ang desisyon. Ang Ombudsman, sa desisyon nga pinetsahan og Septiyembre 26, nitaktak kang Cortes sa serbisyo human siya napamatud-ang sad-an sa grave misconduct tungod sa pagtugot sa padayong operasyon sa usa ka cement batching plant nga way gikinahanglang business ug environmental permits. Si City Administrator Jamaal James Calipayan nitug-an sa mga tigbalita niadtong Miyerkules nga si Cortes nangayo og legal recourse susama sa kang Rama. Ang legal nga lakang ni Cortes susama sa gihimo sa dismissal nga mayor nga si Michael Rama nga niduso usab og petisyon sa SC aron hunongon ang iyang pagkataktak ug pagkadiskwalipikasyon sa serbisyo niadtong Oktubre 7.“The petition for certiorari under Rule 65 of the Supreme Court is a remedy available to the mayor, who stands to be injured by the implementation of this Comelec resolution. Mayor Jonas and Mayor Mike Rama are in similar situations regarding this Comelec resolution’s application,” matod ni Calipayan. Si Calipayan miingon nga ang desisyon batok kaniya dili pa pinal, ug samtang ilang gitahod ang hukom sa Ombudsman, ilang gihagit ang dihadiha nga executory nga kinaiya sa desisyon ilabi na ang paglakip niini sa disqualification penalty. Ang pagkanselar sa iyang COC makapugong sa pagbotar ni Cortes sa 2025 elections, usa ka lakang nga gihulagway ni Calipayan nga usa ka “irreparable” injury sa mayor ug sa katawhan sa Mandaue City. “The disqualification penalty is not like dismissal. If the decision is reversed, the mayor could receive back wages for the time lost. But once disqualified, there’s no turning back, his name will be removed from the ballots, and the people’s choice in the election will be disregarded,” dugang ni Calipayan. Ang legal team ni Cortes nangayo og Temporary Restraining Order (TRO) o Writ of Preliminary Injunction gikan sa SC aron mapugngan ang Comelec sa pagpatuman sa resolusyon sa dili pa ang pag-imprinta sa mga balota nga gikatakdang sugdan karong Nobiyembre 15. Kung wala ang TRO, mahimong tangtangon sa Comelec ang ngalan ni Cortes sa balota nga permanenteng makaapekto sa iyang kandidatura. Nikuwestiyon si Cortes niadtong Martes sa  resolusyon sa Comelec kinsa nangatarongan nga nakalapas kini sa due process nga gigarantiya ubos sa 1987 Constitution. Iyang gihulagway ang resolusyon nga “unconstitutional” ug gimarkahan ang mga lihok sa Comelec nga “ridiculous”  ingon nga ang usa ka desisyon nga dili pinal kinahanglan dili magdala sa ingon ka grabe nga silot. “Now sa kani nga resolution asa naman ang hustisya ani? Is it just? Is it fair? That immediate executory judgment is not final,” dason ni Cortes. Nangayo sab siya og dinaliang motion alang sa pagpahigayon og special raffle. Ang resolusyon naglakip sa mga probisyon alang sa dinaliang pagkansela sa COC alang sa mga kandidato nga gisilotan og disqualification sa Ombudsman bisan pa kon ang desisyon nakaabot na sa finality. Si Cortes niingon nga ang maong resolusyon nagdaot sa katungod sa katawhan sa pagpili sa ilang mga lider sa usa ka demokratikong piniliay nga maoy labing importante. Sa wala pa moabot ang dismissal order, si Cortes nagsilbi usab sa iyang usa ka tuig nga pagkasuspenso nga walay bayad nga gipahamtang kaniya sa Ombudsman sukad niadtong Agusto 12. Gisuspenso sa Ombudsman si Cortes tungod sa grave misconduct ug conduct prejudicial to the best interest of the service tungod sa pagtudlo kang Camilo Basaca isip officer-in-charge sa City Social Welfare Services Office niadtong 2022, nga matod pa sa Ombudsman. / CAV  ",
        "pseudonymized_body": "Ang gitaktak nga mayor, Brody Abando, nangayo og interbensyon sa Supreme Court (SC) aron babagan ang Commission on Elections (Comelec) sa pagpatuman sa dismissal order sa Office of the Ombudsman batok kaniya. Si Abando nisang-at og petisyon alang sa Certiorari, Prohibition, and Injunction atubangan sa SC niadtong Miyerkules, Oktubre 9, 2024, nga naghagit sa Comelec Resolution No. 1104-A, nga nagmando sa hinanaling pagkansela sa mga certificates of candidacy (COCs) sa mga kandidato nga nag-atubang og administratibo nga mga kaso bisan sa wala pa mahimong pinal ang desisyon. Ang Ombudsman, sa desisyon nga pinetsahan og Septiyembre 26, nitaktak kang Abando sa serbisyo human siya napamatud-ang sad-an sa grave misconduct tungod sa pagtugot sa padayong operasyon sa usa ka cement batching plant nga way gikinahanglang business ug environmental permits. Si City Administrator Jamaal Adrian Abangad nitug-an sa mga tigbalita niadtong Miyerkules nga si Abando nangayo og legal recourse susama sa kang Abangan. Ang legal nga lakang ni Abando susama sa gihimo sa dismissal nga mayor nga si Cedie Abangan nga niduso usab og petisyon sa SC aron hunongon ang iyang pagkataktak ug pagkadiskwalipikasyon sa serbisyo niadtong Oktubre 7.“The petition for certiorari under Rule 65 of the Supreme Court is a remedy available to the mayor, who stands to be injured by the implementation of this Comelec resolution. Mayor Brody and Mayor Lizer Abangan are in similar situations regarding this Comelec resolution’s application,” matod ni Abangad. Si Abangad miingon nga ang desisyon batok kaniya dili pa pinal, ug samtang ilang gitahod ang hukom sa Ombudsman, ilang gihagit ang dihadiha nga executory nga kinaiya sa desisyon ilabi na ang paglakip niini sa disqualification penalty. Ang pagkanselar sa iyang COC makapugong sa pagbotar ni Abando sa 2025 elections, usa ka lakang nga gihulagway ni Abangad nga usa ka “irreparable” injury sa mayor ug sa katawhan sa Mandaue City. “The disqualification penalty is not like dismissal. If the decision is reversed, the mayor could receive back wages for the time lost. But once disqualified, there’s no turning back, his name will be removed from the ballots, and the people’s choice in the election will be disregarded,” dugang ni Abangad. Ang legal team ni Abando nangayo og Temporary Restraining Order (TRO) o Writ of Preliminary Injunction gikan sa SC aron mapugngan ang Comelec sa pagpatuman sa resolusyon sa dili pa ang pag-imprinta sa mga balota nga gikatakdang sugdan karong Nobiyembre 15. Kung wala ang TRO, mahimong tangtangon sa Comelec ang ngalan ni Abando sa balota nga permanenteng makaapekto sa iyang kandidatura. Nikuwestiyon si Abando niadtong Martes sa  resolusyon sa Comelec kinsa nangatarongan nga nakalapas kini sa due process nga gigarantiya ubos sa 1987 Constitution. Iyang gihulagway ang resolusyon nga “unconstitutional” ug gimarkahan ang mga lihok sa Comelec nga “ridiculous”  ingon nga ang usa ka desisyon nga dili pinal kinahanglan dili magdala sa ingon ka grabe nga silot. “Now sa kani nga resolution asa naman ang hustisya ani? Is it just? Is it fair? That immediate executory judgment is not final,” dason ni Abando. Nangayo sab siya og dinaliang motion alang sa pagpahigayon og special raffle. Ang resolusyon naglakip sa mga probisyon alang sa dinaliang pagkansela sa COC alang sa mga kandidato nga gisilotan og disqualification sa Ombudsman bisan pa kon ang desisyon nakaabot na sa finality. Si Abando niingon nga ang maong resolusyon nagdaot sa katungod sa katawhan sa pagpili sa ilang mga lider sa usa ka demokratikong piniliay nga maoy labing importante. Sa wala pa moabot ang dismissal order, si Abando nagsilbi usab sa iyang usa ka tuig nga pagkasuspenso nga walay bayad nga gipahamtang kaniya sa Ombudsman sukad niadtong Agusto 12. Gisuspenso sa Ombudsman si Abando tungod sa grave misconduct ug conduct prejudicial to the best interest of the service tungod sa pagtudlo kang Abanto Abao isip officer-in-charge sa City Social Welfare Services Office niadtong 2022, nga matod pa sa Ombudsman. / CAV  ",
        "pseudonymized_title": "Abando midangop sa SC"
    }

    return (
        <div>
            <h1>{article.pseudonymized_title}</h1>
            <p>Article ID: {article.id}</p>
            <p>Article Link: <a href={article.url} target="_blank">{article.url}</a></p>

            <div>
                <TextCompare text1={article.body} text2={article.pseudonymized_body} title="Pseudonymized Article"/>
            </div>
            <Accordion defaultActiveKey="0">
            {
                dataset.data.map((item, index) => (
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>Question #{index +1}</Accordion.Header>
                        <Accordion.Body>
                        <QuestionAnswer
                            key={article.id}
                            article={article}
                            dataset={item}
                            dataset_id={index+1}
                        />
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
            </Accordion>

        
        </div>
    );
};
