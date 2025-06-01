import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function DietItem({ diet }) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const generateWeeklyPDF = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const doc = new jsPDF();

        // Cargar logo como imagen base64
        const logoUrl = `${window.location.origin}/Logo.png`;
        const logoBase64 = await toBase64(logoUrl);

        // Insertar logo
        doc.addImage(logoBase64, 'PNG', 10, 10, 30, 30);

        // Título centrado
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const title = `Weekly Diet for ${user.name}`;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2;
        doc.text(title, x, 45); // debajo del logo

        // Preparar datos de la tabla
        const tableBody = diet.meals.map((mealString, index) => {
            const breakfast = mealString.match(/BREAKFAST:\s*([^,]*)/)?.[1] || '';
            const meal = mealString.match(/MEAL:\s*([^,]*)/)?.[1] || '';
            const dinner = mealString.match(/DINNER:\s*(.*)/)?.[1] || '';
            return [daysOfWeek[index], breakfast, meal, dinner];
        });

        // Tabla con autoTable
        autoTable(doc, {
            startY: 55,
            head: [['Day', 'Breakfast', 'Meal', 'Dinner']],
            body: tableBody,
            styles: {
                fontSize: 12,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontStyle: 'normal',
            },
        });

        doc.save(`weekly_diet_${user.name}.pdf`);
    };

    // Convertir imagen de URL pública a base64
    const toBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => reject('No se pudo cargar el logo');
        });
    };

    return (
        <tr>
            <td>{diet.worker_id}</td>
            <td>
                <table className="meals-subtable">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Breakfast</th>
                            <th>Meal</th>
                            <th>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diet.meals.map((mealString, index) => {
                            const breakfast = mealString.match(/BREAKFAST:\s*([^,]*)/)?.[1] || '';
                            const meal = mealString.match(/MEAL:\s*([^,]*)/)?.[1] || '';
                            const dinner = mealString.match(/DINNER:\s*(.*)/)?.[1] || '';

                            return (
                                <tr key={index}>
                                    <td>{daysOfWeek[index]}</td>
                                    <td>{breakfast}</td>
                                    <td>{meal}</td>
                                    <td>{dinner}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{ marginTop: '10px' }}>
                    <button onClick={generateWeeklyPDF}>
                        📄 Descargar Dieta Semanal en PDF
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default DietItem;
