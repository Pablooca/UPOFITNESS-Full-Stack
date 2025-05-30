function DietItem({ diet }) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                            // Extraer valores individuales
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
            </td>
        </tr>
    );
}

export default DietItem;
