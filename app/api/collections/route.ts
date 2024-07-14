import Collection from '@/lib/models/Collection';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectToDB();
    const { title, description, image } = await req.json();
    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
        return NextResponse.json({ error: 'Collection already exists' }, { status: 400 });
    }
    if (!title || !image) {
        return new NextResponse("Title and image are required", { status: 400 })
      }
  
      const newCollection = await Collection.create({
        title,
        description,
        image,
      })
  
      await newCollection.save()
  
      return NextResponse.json(newCollection, { status: 200 })
  } catch (error) {
    console.log('[collections_POST', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
