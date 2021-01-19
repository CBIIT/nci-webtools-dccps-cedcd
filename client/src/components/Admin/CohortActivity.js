import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';
import PageSummary from '../Paging/Paging';
import Paging from '../Paging/Paging';


export default function CohortActivity() {
    const { abbreviation } = useParams();
    const [activityLog, setActivityLog] = useState([]);
    const [headerSort, setHeaderSort] = useState({create_time: 'desc'});
    const [pageSize, setPageSize] = useState(15);
    const [page, setPage] = useState(0);

    const toggleHeaderSort = key => {
        let newSortOrder = headerSort.hasOwnProperty(key)
            ? headerSort[key] === 'asc' ? 'desc' : 'asc'
            : 'asc';
            setHeaderSort({[key]: newSortOrder});
    }

    const asTitleCase = str => String(str)
        .split(' ')
        .map(s => s[0].toLocaleUpperCase() + s.slice(1).toLocaleLowerCase())
        .join(' ');

    const columns = [
        {key: 'activity', title: 'Activity', Renderer: ({value}) => asTitleCase(value)},
        {key: 'create_time', title: 'Activity Date', Renderer: ({value}) => new Date(value).toLocaleString()},
        {key: 'user_display_name', title: 'Performed By'},
        {key: 'notes', title: 'Notes'},
    ];

    useEffect(() => {
        (async function() {
            if (abbreviation) {
                const response = await fetch(`/api/managecohort/cohortActivityLog/${abbreviation}`);
                const activity = await response.json();
                setActivityLog(activity);
            } else {
                setActivityLog([]);
            }
        })();
    }, [abbreviation]);

    const SortArrow = ({order}) => 
        order === 'asc'
            ? <img src="/assets/img/arrow-up.png" className="tableArrow ml-1" alt="change the sort order to [Z-A] "></img>
            : <img src="/assets/img/arrow-down.png" className="tableArrow ml-1" alt="change the sort order to [Z-A] "></img>;

    return <RequireAuthorization role="SystemAdmin">
        <div className="w-100">
            <h1 class="welcome pg-title">{abbreviation} Activities</h1>
            <p className="welcome mb-4">
                <NavLink to="/admin/managecohort">
                    <i className="fas fa-chevron-left mr-2" />
                    Back to Manage Cohorts
                </NavLink>
            </p>

            <div className="col-md-12">
                <Table bordered condensed>
                    <thead>
                        <tr>
                            {columns.map(({key, title}) => 
                                <th 
                                    key={`table-header-${key}`} 
                                    className="c-pointer" 
                                    onClick={_ => toggleHeaderSort(key)}>
                                    {title}
                                    {headerSort[key] && <SortArrow order={headerSort[key]} />}
                                </th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {activityLog.sort((a, b) => {
                            let [key, order] = Object.entries(headerSort)[0];
                            let [aValue, bValue] = [a[key], b[key]].map(e => e || '');
                            return order === 'asc' 
                                ? aValue.localeCompare(bValue)
                                : bValue.localeCompare(aValue)
                        }).filter((_, i) => page === -1 || (
                            i >= page * pageSize && 
                            i < (page + 1) * pageSize
                        )).map((log, rowIndex) => <tr key={`table-row-${rowIndex}`}>
                            {columns.map(({key, Renderer = ({value}) => <>{value}</>}) => 
                                <td key={`table-cell-${rowIndex}-${key}`}>
                                    <Renderer value={log[key]} />
                                </td>
                            )}
                        </tr>)}
                    </tbody>
                </Table>

                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <label htmlFor="page-size" className="mr-1">Page Size: </label>
                        <select id="page-size" value={pageSize} onChange={e => {setPageSize(e.target.value); setPage(0)}}>
                            {[5, 10, 15, 20].map(size => <option value={size}>{size}</option>)}
                        </select>
                    </div>

                    <div className="d-flex">
                        <span className="mt-1 mr-2">
                            Viewing {page === -1
                                ? 'All'
                                : `${1 + (page * pageSize)}-${Math.min(activityLog.length, (page + 1) * pageSize)} of ${activityLog.length}`
                            }
                        </span>
                        <Paging 
                            pageInfo={{
                                page: page === -1 ? 0 : page + 1, 
                                pageSize, 
                                total: activityLog.length
                            }} 
                            onClick={e => setPage(e === -1 ? 0 : e - 1)} />
                    </div>
                </div>

            </div>
        </div>
    </RequireAuthorization>
 
 
}