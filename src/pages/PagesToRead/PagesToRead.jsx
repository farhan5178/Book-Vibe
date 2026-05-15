import React, { useContext } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { BookContext } from '../../context/BookProvider';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const PagesToRead = () => {
    const { storedBooks } = useContext(BookContext);

    const data = storedBooks.map(book => ({
        name: book.bookName,
        uv: book.totalPages
    }));

    return (
        <div className="container mx-auto my-12 bg-gray-50 p-8 rounded-3xl min-h-[600px] flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-10 text-center">Pages to Read Visualization</h2>
            
            {storedBooks.length > 0 ? (
                <div className="w-full h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-bold mb-4">No books in your Read List yet!</p>
                    <p className="text-gray-400">Add some books to your read list to see the chart.</p>
                </div>
            )}
        </div>
    );
};

export default PagesToRead;
