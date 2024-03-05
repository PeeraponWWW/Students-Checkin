export default function CheckinList({...props}) {
    return (
        <div>
            <h1>CheckinList</h1>
            <table>
                <thead>
                <tr>
                    <th>ลำดับ</th>
                    <th>วิชา</th>
                    <th>ห้อง</th>
                    <th>รหัสห้อง</th>
                    <th>วันที่</th>
                </tr>
                </thead>
                <tbody>
                {props.checkin.map((checkin, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{checkin.subject}</td>
                            <td>{checkin.room}</td>
                            <td>{checkin.id}</td>
                            <td>{checkin.class_date.toDate().toLocaleDateString()}</td>
                        </tr>
                    )
                }
                )}
                </tbody>
            </table>
        </div>
    );
}