import ErrorMessage from '../ErrorMessage';

import './table.css'

const TableComponent = ({ data }) => {



    return (
        <table className="table mt-4 topic-tabel rounded m-0">
            <thead>
                <tr>
                    <th
                        className="h4 px-4 align-items-center py-3 overflow-hidden text-truncate table-row"
                    >
                        {data?.topic} Sub Topics
                    </th>
                </tr>
            </thead>
            <tbody id="tBody">
                {data?.subtopics.map((x, index) => {
                    return (
                        <tr key={`${index}`}>
                            <td className="d-flex px-4 gap-2 align-items-center py-3 overflow-hidden text-truncate">
                                <ion-icon name="checkmark-circle-outline"></ion-icon><p className="m-0">{x}</p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            <ErrorMessage></ErrorMessage>
        </table>
    );
};

export default TableComponent;